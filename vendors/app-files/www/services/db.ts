//import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { state } from '../services/store';
import { processTokens } from "../helpers/tokens";


export class Database {

    db;
    dbname: string;
    device;
    
    constructor() {
      this.dbname = 'appp-db';
      this.load();
    }

    async load() {
      this.device = await Device.getInfo();
      this.db = await this.openDB(this.dbname);
      console.log( await this.db.getTableList());
      this.setUp();
    }

    async setUp() {
      await this.addTables();
    }

    async addTables() {

      const db_data = (state.data as any).database;


      if ( 'tables' in db_data && db_data.tables.length > 0 ) {
       
        db_data.tables.map( async table => {

          let query = '';

          console.log('add Tables', table);

          if ( table.columns.length > 0 ) {
           

            let columns = '';

            table.columns.map(column => {
              columns += `${column.column_name.trim()} ${column.column_type.trim().toUpperCase()}${ column.primary_key === true ? ' PRIMARY KEY' : '' },`;
            });

            query = `CREATE TABLE IF NOT EXISTS ${table.name.trim()} (${columns.substring(0, columns.length - 1)});`;

          }

          await this.execute(query);

        });

  
        // queries.map( async query => {
        //   console.log('add Tables query', [query]);
        //   await this.execute(query);
        // })

        
      } else {
        console.log('no Tables', db_data);
      }

    }

  
  async getTrackerByDate(start, end) {
            
    //let query = "SELECT * FROM tracker LEFT JOIN providers AS p ON ( p.id = tracker.provider_id )";
   //let query = `SELECT * FROM tracker WHERE date <= date('now', '-7 day');`;

   let query = `SELECT * FROM tracker LEFT JOIN providers AS p ON ( p.id = tracker.provider_id ) WHERE date >= ${start} and date <= ${end}`;
  
    const res = await this.db.query({
      database: 'tracker',
      values: [],
      statement: query,
      readonly: false
    });
  
    return res.values;
  
}

  /**
   * close sqlite db connection
   * @param database 
   */
  async closeDB(database) {
    await CapacitorSQLite.closeConnection({database:database});
  }

  /**
   * 
   * @param database Open sqlite db connection
   * @returns 
   */
  async openDB(database) {

    const sqlitePlugin: any = CapacitorSQLite;
    const sqlite = new SQLiteConnection(sqlitePlugin);

    if(this.device.platform === "web") {

      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      await customElements.whenDefined('jeep-sqlite');
      await sqlite.initWebStore();
      console.log('after sqlite.initWebStore()');   
    }

    const r = await sqlite.isConnection(database, false);

    let db;

    if (r.result === true) {
      console.log('retrieveConnection', r.result);
      db = await sqlite.retrieveConnection(database, false);
    } else {
      console.log('createConnection', r.result);
      db = await sqlite.createConnection(database, false, '', 2, false);
    }


    await db.open();

    console.log('connection db', db);

    const isDB = await db.isDBOpen({database: database});

    if (isDB.result === true) {
      
      return db
    } else {
      return;
    }

  }

  async deleteDB(dbase) {
    this.device = await Device.getInfo();
    const db = await this.openDB(dbase);
    db.delete();
  }

  /**
   * Run sql query to return data
   * @param statement 
   * @returns 
   */
  async query(statement?) {

    if (statement) {

      try {

        const res = await this.db.query(statement, []);

        console.log('res', res.values);
        await this.closeDB(this.dbname);
    
        return res.values;
        
      } catch (error) {
        console.log(error);
        await this.closeDB(this.dbname);
      }
      
    }

    return;
  }

  /**
   * Execure raw sql query.
   * @param statement 
   * @returns 
   */
  async execute(statement?) {

    if (statement) {

      const db = await this.openDB('appp-db');

      console.log(this.dbname, db);

      try {

        const res = await db.execute(`${statement};`);

        if (this.device.platform === "web") {
          db.saveToStore({database: this.dbname});
        }

        //await this.closeDB(this.dbname);
        return res.values;
        
      } catch (error) {
        console.log('execute', error);
        //await this.closeDB(this.dbname);
        return;
      }
    }

    await this.closeDB(this.dbname);

    return;

  }

  /**
   * Insert row into database.
   * @param attr 
   * @param data 
   * @returns 
   */
  async insert(attr, data) {

    console.log('insert', attr, data)

    this.device = await Device.getInfo();

    const db = await this.openDB('appp-db');

    console.log( await db.getTableList());

    if (db && data) {

      if ('timestamp' in data ) {
        data['timestamp'] = Date.now();
      } 

      const keys = Object.keys(data);
      const values = Object.values(data);

      const vls = values.map( _v => _v = '?' );

      let query = `INSERT into ${attr.table_name.trim()} (${keys}) VALUES(${vls}) ${processTokens(attr.where_statement, state.api)};`;

      try {

        const rsp = await db.run(query, values, false);
 
        await this.closeDB('appp-db');
   
        return rsp;
        
      } catch (error) {
        console.log(error);
        await this.closeDB('appp-db');
      }
        

      return;
    }
    

  }

  /**
   * Insert row into database.
   * @param attr 
   * @param data 
   * @returns 
   */
  async update(attr, data) {

    console.log('update', attr, data, state.data)

    this.device = await Device.getInfo();

    const db = await this.openDB(this.dbname);

    if (db && data) {

      if ('timestamp' in data ) {
        data['timestamp'] = Date.now();
      } 

      const keys = Object.keys(data);
      const values = Object.values(data).map( item => `'${item}'`);
  
      let query = `UPDATE ${attr.table_name} SET (${keys}) = (${values}) ${processTokens(attr.where_statement, state.api)};`;

      console.log(query);

      try {

        const rsp = await db.run(query, [], false);
 
        await db.close(this.dbname);
        await this.closeDB(this.dbname);
   
        return rsp;
        
      } catch (error) {
        console.log(error);
        await db.close(this.dbname);
        await this.closeDB(this.dbname);
      }
        

      return;
    }
    

  }
        
}
