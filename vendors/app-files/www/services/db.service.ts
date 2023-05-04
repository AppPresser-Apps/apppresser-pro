//import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from "@capacitor/core";
import { state } from './store';
import { processTokens } from "../helpers/tokens";

/**
 * Database Service
 * 
 * @class DatabaseService
 * @since 1.0.0
 * @version 1.0.0
 */
export class DatabaseService {

  private isWeb: boolean = false;
  private readonly sqlite: SQLiteConnection;
  private _db: SQLiteDBConnection | null = null;
  private readonly db_data: { version: string; tables: any[]; };

  dbname = 'appp-db';

  /**
   * Creates an instance of DatabaseService.
   * 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  constructor() {
    if(Capacitor.getPlatform() === "web") this.isWeb = true;
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.db_data = (state.data as any).database;
  }

  /**
   * Initialize the database
   * 
   * @param dbname 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  public async initialize(dbname?: string){

    if (dbname) {
      this.dbname = dbname;
    }

    if (this.isWeb) {
        const webStoreName = 'jeep-sqlite';
        if (!document.querySelector(webStoreName)) {
            const jeepSqlite = document.createElement(webStoreName);
            document.body.appendChild(jeepSqlite);
            await customElements.whenDefined(webStoreName);
        }
        await this.sqlite.initWebStore();
    }

    try {

      this._db = await this.sqlite.createConnection( this.dbname, false, 'no-encryption', parseInt(this.db_data.version), false);

      state.database = this;

      if(this._db === null) {
        console.log(`database.service initialize Error: _db is null`);
      }

      console.log(`$$$ initialize successful`);
    } catch (err) {
      console.log(`database.service initialize Error: ${JSON.stringify(err)}`);
    }
  }

  /**
   * Create the database
   * 
   * @param dbname
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  public async load() {

    await state.database._db.open();

    const { version } = await state.database._db.getVersion();
    const { values } = await state.database._db.getTableList();

    console.log(version);
    console.log(values);

    if ( version !== 0 && version !== parseInt(this.db_data.version) ) {
      await this.alterTables();
    } else {
      if (  this.db_data.tables.length > 0 ) {
        await this.addTables();
      }
    }

    console.log(`$$$ load successful`);

  }

  /**
   * Delete the database
   * 
   * @param dbname
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0 
   */
  public async deleteDb(){
    try {
      if(state.database._db !== null) {
        await state.database._db.close();
        console.log(`$$$ deleteDb close successful`);
        await this._db.delete();
        console.log(`$$$ deleteDb successful`);
      } else {
        console.log(`database.service deleteDb Error: _db is null`);
      }

    } catch (err) {
      console.log(`database.service deleteDb Error: ${JSON.stringify(err)}`);
    }
  }

  /**
   * Add table
   * 
   * @param table 
   * @returns 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  private async addTable(table?: any){
    try {
      if(state.database._db !== null) {

        await state.database._db.open();
        //await this._db.execute(`PRAGMA journal_mode=WAL;`,false);
        await state.database._db.execute(`PRAGMA user_version = ${this.db_data.version};`, false);
        
        const tbl = await state.database._db.execute(table);

        if (tbl.changes.changes === 0 ) {
          console.log(`$$$ addTables table exists`);
        } else {
          console.log(`$$$ addTables successful`, tbl, table);
        }

        if (this.isWeb) {
          this.sqlite.saveToStore(this.dbname);
        }
        return tbl;            
      } else {
        console.log(`database.service addTables Error: _db is null`);
      }
    } catch (err) {
      console.log(`database.service addTables Error: ${JSON.stringify(err)}`);
    }
  }

  /**
   * Process columns add any tables
   * 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  async addTables() {

    let queries = [];

    if ( 'tables' in this.db_data && this.db_data.tables.length > 0 ) {
     
      this.db_data.tables.map( async (table: { columns: any[]; name: string; }) => {

        if ( table.columns.length > 0 ) {
         
          let columns = '';

          table.columns.map((column: { column_name: string; column_type: string; primary_key: boolean; }) => {
            columns += `${column.column_name.trim()} ${column.column_type.trim().toUpperCase()}${ column.primary_key === true ? ' PRIMARY KEY' : '' }, `;
          });

          queries.push(`CREATE TABLE IF NOT EXISTS ${table.name.trim()} (${columns.substring(0, columns.length - 2)});`);

        }

      });

      queries.forEach( async table => {
          await this.addTable(table);
      });

    } else {
      console.log('no Tables', this.db_data);
    }

  }

  /**
   * Process columns add update tables
   * 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  async alterTables() {

    let queries = '';

    if ( 'tables' in this.db_data && this.db_data.tables.length > 0 ) {
     
      this.db_data.tables.map( async (table: { columns: any[]; name: string; }) => {

        if ( table.columns.length > 0 ) {
         
          let columns = '';

          table.columns.map((column: { column_name: string; column_type: string; primary_key: boolean; }) => {
            columns += `ADD COLUMN ${column.column_name.trim()} ${column.column_type.trim().toUpperCase()}${ column.primary_key === true ? ' PRIMARY KEY' : '' }, `;
          });

          queries += `ALTER TABLE ${table.name.trim()} ${columns.substring(0, columns.length - 2)}; `;

        }

      });

  
      const sql = await this.sqlite.addUpgradeStatement(this.dbname, parseInt(this.db_data.version), [queries]);
    
      this._db = await this.sqlite.createConnection( this.dbname, false, 'no-encryption', parseInt(this.db_data.version), false);

      await state.database._db.open();
      await state.database._db.execute(`PRAGMA user_version = ${this.db_data.version};`, false);
   
      if (this.isWeb) {
        this.sqlite.saveToStore(this.dbname);
      }
      return sql;

    } else {
      console.log('no Tables', this.db_data);
    }

  }

  /**
   * Run sql query to return data
   * 
   * @param statement 
   * @returns 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  public async query(statement?: any): Promise<any> {

    console.log(state.database._db, this.sqlite, statement);

    if (statement) {

      try {

        const res = await state.database._db.query(statement, []);

        console.log(res);

        return res.values;
        
      } catch (error) {
        console.log(error);
      }
      
    }

    return;
  }

  /**
   * Execure raw sql query.
   * 
   * @param statement 
   * @returns 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  async execute(statement?: any): Promise<any> {

    if (statement) {

      try {

        const res = await this._db.execute(`${statement};`);

        if (this.isWeb) {
          this.sqlite.saveToStore(this.dbname);
        }
        return res;
        
      } catch (error) {
        console.log('execute', error);
        return;
      }
    }

    return;

  }

  /**
   * Insert row into database.
   * 
   * @param attr 
   * @param data 
   * @returns 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  public async insert(attr: { where_statement: any; table: string; }, data: { [s: string]: unknown; } | ArrayLike<unknown>): Promise<any> {

    console.log('insert', attr, data)

    if (data) {

      if ('timestamp' in data ) {
        data['timestamp'] = Date.now();
      } 

      const keys = Object.keys(data);
      const values = Object.values(data);

      const vls = values.map( _v => _v = '?' );

      const api = state.api ? state.api : [];
      const where = attr.where_statement ? attr.where_statement : '';

      let query = `INSERT into ${attr.table.trim()} (${keys}) VALUES(${vls}) ${processTokens(where, api)};`;

      console.log(query);

      try {

        const rsp = await state.database._db.run(query, values, false);
 
        if (this.isWeb) {
          this.sqlite.saveToStore(this.dbname);
        }
   
        return rsp;
        
      } catch (error) {
        console.log(error);
      }
        

      return;
    }
    

  }

  /**
   * Insert row into database.
   * 
   * @param attr 
   * @param data 
   * @returns 
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  public async update(attr: { table: any; where_statement: any; }, data: { [s: string]: unknown; } | ArrayLike<unknown>) {

    console.log('update', attr, data, state.data)

    if (data) {

      if ('timestamp' in data ) {
        data['timestamp'] = Date.now();
      } 

      const keys = Object.keys(data);
      const values = Object.values(data).map( item => `'${item}'`);
  
      let query = `UPDATE ${attr.table} SET (${keys}) = (${values}) ${processTokens(attr.where_statement, state.api)};`;

      try {

        const rsp = await state.database._db.run(query, [], false);

        if (this.isWeb) {
          this.sqlite.saveToStore(this.dbname);
        }
   
        return rsp;
        
      } catch (error) {
        console.log(error);
      }
        

      return;
    }
    

  }

}