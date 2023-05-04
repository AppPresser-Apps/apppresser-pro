import { r as registerInstance, i as Build, l as h, q as getElement } from './index-6c5afe2f.js';
import { s as state } from './store-b76a13b4.js';
import { P as Preferences } from './index-c532d7cb.js';
import { r as renderLeftButtons, a as renderTitle, b as renderRightButtons } from './toolbar-7ada3329.js';
import { r as renderComponent } from './content-13f7c228.js';
import { r as registerPlugin, C as Capacitor } from './index-0f2ea1ed.js';
import { p as processTokens } from './tokens-4662bc6d.js';
import './index-7c8dd725.js';
import { m as modalController } from './overlays-ef00d22b.js';

//import { Capacitor } from '@capacitor/core';
/**
 * SQLiteConnection Class
 */
class SQLiteConnection {
    constructor(sqlite) {
        this.sqlite = sqlite;
        this._connectionDict = new Map();
    }
    async initWebStore() {
        try {
            await this.sqlite.initWebStore();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async saveToStore(database) {
        try {
            await this.sqlite.saveToStore({ database });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async echo(value) {
        try {
            const res = await this.sqlite.echo({ value });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isSecretStored() {
        try {
            const res = await this.sqlite.isSecretStored();
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async setEncryptionSecret(passphrase) {
        try {
            await this.sqlite.setEncryptionSecret({ passphrase: passphrase });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async changeEncryptionSecret(passphrase, oldpassphrase) {
        try {
            await this.sqlite.changeEncryptionSecret({
                passphrase: passphrase,
                oldpassphrase: oldpassphrase,
            });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async clearEncryptionSecret() {
        try {
            await this.sqlite.clearEncryptionSecret();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async addUpgradeStatement(database, toVersion, statements) {
        const upgrade = {
            toVersion,
            statements,
        };
        try {
            if (database.endsWith('.db'))
                database = database.slice(0, -3);
            await this.sqlite.addUpgradeStatement({
                database,
                upgrade: [upgrade],
            });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async createConnection(database, encrypted, mode, version, readonly) {
        try {
            if (database.endsWith('.db'))
                database = database.slice(0, -3);
            await this.sqlite.createConnection({
                database,
                encrypted,
                mode,
                version,
                readonly,
            });
            const conn = new SQLiteDBConnection(database, readonly, this.sqlite);
            const connName = readonly ? `RO_${database}` : `RW_${database}`;
            this._connectionDict.set(connName, conn);
            return Promise.resolve(conn);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async closeConnection(database, readonly) {
        try {
            if (database.endsWith('.db'))
                database = database.slice(0, -3);
            await this.sqlite.closeConnection({ database, readonly });
            const connName = readonly ? `RO_${database}` : `RW_${database}`;
            this._connectionDict.delete(connName);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isConnection(database, readonly) {
        const res = {};
        if (database.endsWith('.db'))
            database = database.slice(0, -3);
        const connName = readonly ? `RO_${database}` : `RW_${database}`;
        res.result = this._connectionDict.has(connName);
        return Promise.resolve(res);
    }
    async retrieveConnection(database, readonly) {
        if (database.endsWith('.db'))
            database = database.slice(0, -3);
        const connName = readonly ? `RO_${database}` : `RW_${database}`;
        if (this._connectionDict.has(connName)) {
            const conn = this._connectionDict.get(connName);
            if (typeof conn != 'undefined')
                return Promise.resolve(conn);
            else {
                return Promise.reject(`Connection ${database} is undefined`);
            }
        }
        else {
            return Promise.reject(`Connection ${database} does not exist`);
        }
    }
    async getNCDatabasePath(path, database) {
        try {
            const databasePath = await this.sqlite.getNCDatabasePath({
                path,
                database,
            });
            return Promise.resolve(databasePath);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async createNCConnection(databasePath, version) {
        try {
            await this.sqlite.createNCConnection({
                databasePath,
                version,
            });
            const conn = new SQLiteDBConnection(databasePath, true, this.sqlite);
            const connName = `RO_${databasePath})`;
            this._connectionDict.set(connName, conn);
            return Promise.resolve(conn);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async closeNCConnection(databasePath) {
        try {
            await this.sqlite.closeNCConnection({ databasePath });
            const connName = `RO_${databasePath})`;
            this._connectionDict.delete(connName);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isNCConnection(databasePath) {
        const res = {};
        const connName = `RO_${databasePath})`;
        res.result = this._connectionDict.has(connName);
        return Promise.resolve(res);
    }
    async retrieveNCConnection(databasePath) {
        if (this._connectionDict.has(databasePath)) {
            const connName = `RO_${databasePath})`;
            const conn = this._connectionDict.get(connName);
            if (typeof conn != 'undefined')
                return Promise.resolve(conn);
            else {
                return Promise.reject(`Connection ${databasePath} is undefined`);
            }
        }
        else {
            return Promise.reject(`Connection ${databasePath} does not exist`);
        }
    }
    async isNCDatabase(databasePath) {
        try {
            const res = await this.sqlite.isNCDatabase({ databasePath });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async retrieveAllConnections() {
        return this._connectionDict;
    }
    async closeAllConnections() {
        const delDict = new Map();
        try {
            for (const key of this._connectionDict.keys()) {
                const database = key.substring(3);
                const readonly = key.substring(0, 3) === 'RO_' ? true : false;
                await this.sqlite.closeConnection({ database, readonly });
                delDict.set(key, null);
            }
            for (const key of delDict.keys()) {
                this._connectionDict.delete(key);
            }
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async checkConnectionsConsistency() {
        try {
            const keys = [...this._connectionDict.keys()];
            const openModes = [];
            const dbNames = [];
            for (const key of keys) {
                openModes.push(key.substring(0, 2));
                dbNames.push(key.substring(3));
            }
            const res = await this.sqlite.checkConnectionsConsistency({
                dbNames: dbNames,
                openModes: openModes,
            });
            if (!res.result)
                this._connectionDict = new Map();
            return Promise.resolve(res);
        }
        catch (err) {
            this._connectionDict = new Map();
            return Promise.reject(err);
        }
    }
    async importFromJson(jsonstring) {
        try {
            const ret = await this.sqlite.importFromJson({ jsonstring: jsonstring });
            return Promise.resolve(ret);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isJsonValid(jsonstring) {
        try {
            const ret = await this.sqlite.isJsonValid({ jsonstring: jsonstring });
            return Promise.resolve(ret);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async copyFromAssets(overwrite) {
        const mOverwrite = overwrite != null ? overwrite : true;
        try {
            await this.sqlite.copyFromAssets({ overwrite: mOverwrite });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getFromHTTPRequest(url, overwrite) {
        const mOverwrite = overwrite != null ? overwrite : true;
        try {
            await this.sqlite.getFromHTTPRequest({ url, overwrite: mOverwrite });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isDatabase(database) {
        if (database.endsWith('.db'))
            database = database.slice(0, -3);
        try {
            const res = await this.sqlite.isDatabase({ database: database });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getDatabaseList() {
        try {
            const res = await this.sqlite.getDatabaseList();
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getMigratableDbList(folderPath) {
        if (!folderPath || folderPath.length === 0) {
            return Promise.reject('You must provide a folder path');
        }
        try {
            const res = await this.sqlite.getMigratableDbList({
                folderPath: folderPath,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async addSQLiteSuffix(folderPath, dbNameList) {
        const path = folderPath ? folderPath : 'default';
        const dbList = dbNameList ? dbNameList : [];
        try {
            const res = await this.sqlite.addSQLiteSuffix({
                folderPath: path,
                dbNameList: dbList,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async deleteOldDatabases(folderPath, dbNameList) {
        const path = folderPath ? folderPath : 'default';
        const dbList = dbNameList ? dbNameList : [];
        try {
            const res = await this.sqlite.deleteOldDatabases({
                folderPath: path,
                dbNameList: dbList,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async moveDatabasesAndAddSuffix(folderPath, dbNameList) {
        const path = folderPath ? folderPath : 'default';
        const dbList = dbNameList ? dbNameList : [];
        return this.sqlite.moveDatabasesAndAddSuffix({
            folderPath: path,
            dbNameList: dbList,
        });
    }
}
/**
 * SQLiteDBConnection Class
 */
class SQLiteDBConnection {
    constructor(dbName, readonly, sqlite) {
        this.dbName = dbName;
        this.readonly = readonly;
        this.sqlite = sqlite;
    }
    getConnectionDBName() {
        return this.dbName;
    }
    getConnectionReadOnly() {
        return this.readonly;
    }
    async open() {
        try {
            await this.sqlite.open({
                database: this.dbName,
                readonly: this.readonly,
            });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async close() {
        try {
            await this.sqlite.close({
                database: this.dbName,
                readonly: this.readonly,
            });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getUrl() {
        try {
            const res = await this.sqlite.getUrl({
                database: this.dbName,
                readonly: this.readonly,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getVersion() {
        try {
            const version = await this.sqlite.getVersion({
                database: this.dbName,
                readonly: this.readonly,
            });
            return Promise.resolve(version);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getTableList() {
        try {
            const res = await this.sqlite.getTableList({
                database: this.dbName,
                readonly: this.readonly,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async execute(statements, transaction = true) {
        try {
            if (!this.readonly) {
                const res = await this.sqlite.execute({
                    database: this.dbName,
                    statements: statements,
                    transaction: transaction,
                    readonly: false,
                });
                return Promise.resolve(res);
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async query(statement, values) {
        let res;
        try {
            if (values && values.length > 0) {
                res = await this.sqlite.query({
                    database: this.dbName,
                    statement: statement,
                    values: values,
                    readonly: this.readonly,
                });
            }
            else {
                res = await this.sqlite.query({
                    database: this.dbName,
                    statement: statement,
                    values: [],
                    readonly: this.readonly,
                });
            }
            if (res && typeof res.values[0] === 'object') {
                if (Object.keys(res.values[0]).includes('ios_columns')) {
                    const columnList = res.values[0]['ios_columns'];
                    const iosRes = [];
                    for (let i = 1; i < res.values.length; i++) {
                        const rowJson = res.values[i];
                        const resRowJson = {};
                        for (const item of columnList) {
                            resRowJson[item] = rowJson[item];
                        }
                        iosRes.push(resRowJson);
                    }
                    res = {};
                    res['values'] = iosRes;
                }
            }
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async run(statement, values, transaction = true) {
        let res;
        try {
            if (!this.readonly) {
                if (values && values.length > 0) {
                    res = await this.sqlite.run({
                        database: this.dbName,
                        statement: statement,
                        values: values,
                        transaction: transaction,
                        readonly: false,
                    });
                    //        }
                }
                else {
                    res = await this.sqlite.run({
                        database: this.dbName,
                        statement: statement,
                        values: [],
                        transaction: transaction,
                        readonly: false,
                    });
                }
                return Promise.resolve(res);
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async executeSet(set, transaction = true) {
        try {
            if (!this.readonly) {
                const res = await this.sqlite.executeSet({
                    database: this.dbName,
                    set: set,
                    transaction: transaction,
                    readonly: false,
                });
                //      }
                return Promise.resolve(res);
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isExists() {
        try {
            const res = await this.sqlite.isDBExists({
                database: this.dbName,
                readonly: this.readonly,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isTable(table) {
        try {
            const res = await this.sqlite.isTableExists({
                database: this.dbName,
                table: table,
                readonly: this.readonly,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async isDBOpen() {
        try {
            const res = await this.sqlite.isDBOpen({
                database: this.dbName,
                readonly: this.readonly,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async delete() {
        try {
            if (!this.readonly) {
                await this.sqlite.deleteDatabase({
                    database: this.dbName,
                    readonly: false,
                });
                return Promise.resolve();
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async createSyncTable() {
        try {
            if (!this.readonly) {
                const res = await this.sqlite.createSyncTable({
                    database: this.dbName,
                    readonly: false,
                });
                return Promise.resolve(res);
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async setSyncDate(syncdate) {
        try {
            if (!this.readonly) {
                await this.sqlite.setSyncDate({
                    database: this.dbName,
                    syncdate: syncdate,
                    readonly: false,
                });
                return Promise.resolve();
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getSyncDate() {
        try {
            const res = await this.sqlite.getSyncDate({
                database: this.dbName,
                readonly: this.readonly,
            });
            let retDate = '';
            if (res.syncDate > 0)
                retDate = new Date(res.syncDate * 1000).toISOString();
            return Promise.resolve(retDate);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async exportToJson(mode) {
        try {
            const res = await this.sqlite.exportToJson({
                database: this.dbName,
                jsonexportmode: mode,
                readonly: this.readonly,
            });
            return Promise.resolve(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async deleteExportedRows() {
        try {
            if (!this.readonly) {
                await this.sqlite.deleteExportedRows({
                    database: this.dbName,
                    readonly: false,
                });
                return Promise.resolve();
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async executeTransaction(txn) {
        try {
            if (!this.readonly) {
                const ret = await this.sqlite.execute({
                    database: this.dbName,
                    statements: 'BEGIN TRANSACTION;',
                    transaction: false,
                });
                if (ret.changes.changes < 0) {
                    return Promise.reject('Error in BEGIN TRANSACTION');
                }
                for (const task of txn) {
                    if (task.values && task.values.length > 0) {
                        const ret = await this.sqlite.run({
                            database: this.dbName,
                            statement: task.statement,
                            values: task.values,
                            transaction: false,
                            readonly: false,
                        });
                        if (ret.changes.lastId === -1) {
                            await this.execute('ROLLBACK;', false);
                            return Promise.reject('Error in transaction run ');
                        }
                    }
                    else {
                        const ret = await this.sqlite.execute({
                            database: this.dbName,
                            statements: task.statement,
                            transaction: false,
                            readonly: false,
                        });
                        if (ret.changes.changes < 0) {
                            await this.sqlite.execute({
                                database: this.dbName,
                                statements: 'ROLLBACK;',
                                transaction: false,
                                readonly: false,
                            });
                            return Promise.reject('Error in transaction execute ');
                        }
                    }
                }
                await this.sqlite.execute({
                    database: this.dbName,
                    statements: 'COMMIT;',
                    transaction: false,
                    readonly: false,
                });
                return Promise.resolve();
            }
            else {
                return Promise.reject('not allowed in read-only mode');
            }
        }
        catch (err) {
            await this.sqlite.execute({
                database: this.dbName,
                statements: 'ROLLBACK;',
                transaction: false,
                readonly: false,
            });
            return Promise.reject(err);
        }
    }
}

const CapacitorSQLite = registerPlugin('CapacitorSQLite', {
    web: () => import('./web-27931f14.js').then(m => new m.CapacitorSQLiteWeb()),
    electron: () => window.CapacitorCustomPlatform.plugins.CapacitorSQLite,
});

//import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
/**
 * Database Service
 *
 * @class DatabaseService
 * @since 1.0.0
 * @version 1.0.0
 */
class DatabaseService {
  /**
   * Creates an instance of DatabaseService.
   *
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  constructor() {
    this.isWeb = false;
    this._db = null;
    this.dbname = 'appp-db';
    if (Capacitor.getPlatform() === "web")
      this.isWeb = true;
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.db_data = state.data.database;
  }
  /**
   * Initialize the database
   *
   * @param dbname
   * @memberof DatabaseService
   * @since 1.0.0
   * @version 1.0.0
   */
  async initialize(dbname) {
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
      this._db = await this.sqlite.createConnection(this.dbname, false, 'no-encryption', parseInt(this.db_data.version), false);
      state.database = this;
      if (this._db === null) {
        console.log(`database.service initialize Error: _db is null`);
      }
      console.log(`$$$ initialize successful`);
    }
    catch (err) {
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
  async load() {
    await state.database._db.open();
    const { version } = await state.database._db.getVersion();
    const { values } = await state.database._db.getTableList();
    console.log(version);
    console.log(values);
    if (version !== 0 && version !== parseInt(this.db_data.version)) {
      await this.alterTables();
    }
    else {
      if (this.db_data.tables.length > 0) {
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
  async deleteDb() {
    try {
      if (state.database._db !== null) {
        await state.database._db.close();
        console.log(`$$$ deleteDb close successful`);
        await this._db.delete();
        console.log(`$$$ deleteDb successful`);
      }
      else {
        console.log(`database.service deleteDb Error: _db is null`);
      }
    }
    catch (err) {
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
  async addTable(table) {
    try {
      if (state.database._db !== null) {
        await state.database._db.open();
        //await this._db.execute(`PRAGMA journal_mode=WAL;`,false);
        await state.database._db.execute(`PRAGMA user_version = ${this.db_data.version};`, false);
        const tbl = await state.database._db.execute(table);
        if (tbl.changes.changes === 0) {
          console.log(`$$$ addTables table exists`);
        }
        else {
          console.log(`$$$ addTables successful`, tbl, table);
        }
        if (this.isWeb) {
          this.sqlite.saveToStore(this.dbname);
        }
        return tbl;
      }
      else {
        console.log(`database.service addTables Error: _db is null`);
      }
    }
    catch (err) {
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
    if ('tables' in this.db_data && this.db_data.tables.length > 0) {
      this.db_data.tables.map(async (table) => {
        if (table.columns.length > 0) {
          let columns = '';
          table.columns.map((column) => {
            columns += `${column.column_name.trim()} ${column.column_type.trim().toUpperCase()}${column.primary_key === true ? ' PRIMARY KEY' : ''}, `;
          });
          queries.push(`CREATE TABLE IF NOT EXISTS ${table.name.trim()} (${columns.substring(0, columns.length - 2)});`);
        }
      });
      queries.forEach(async (table) => {
        await this.addTable(table);
      });
    }
    else {
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
    if ('tables' in this.db_data && this.db_data.tables.length > 0) {
      this.db_data.tables.map(async (table) => {
        if (table.columns.length > 0) {
          let columns = '';
          table.columns.map((column) => {
            columns += `ADD COLUMN ${column.column_name.trim()} ${column.column_type.trim().toUpperCase()}${column.primary_key === true ? ' PRIMARY KEY' : ''}, `;
          });
          queries += `ALTER TABLE ${table.name.trim()} ${columns.substring(0, columns.length - 2)}; `;
        }
      });
      const sql = await this.sqlite.addUpgradeStatement(this.dbname, parseInt(this.db_data.version), [queries]);
      this._db = await this.sqlite.createConnection(this.dbname, false, 'no-encryption', parseInt(this.db_data.version), false);
      await state.database._db.open();
      await state.database._db.execute(`PRAGMA user_version = ${this.db_data.version};`, false);
      if (this.isWeb) {
        this.sqlite.saveToStore(this.dbname);
      }
      return sql;
    }
    else {
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
  async query(statement) {
    console.log(state.database._db, this.sqlite, statement);
    if (statement) {
      try {
        const res = await state.database._db.query(statement, []);
        console.log(res);
        return res.values;
      }
      catch (error) {
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
  async execute(statement) {
    if (statement) {
      try {
        const res = await this._db.execute(`${statement};`);
        if (this.isWeb) {
          this.sqlite.saveToStore(this.dbname);
        }
        return res;
      }
      catch (error) {
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
  async insert(attr, data) {
    console.log('insert', attr, data);
    if (data) {
      if ('timestamp' in data) {
        data['timestamp'] = Date.now();
      }
      const keys = Object.keys(data);
      const values = Object.values(data);
      const vls = values.map(_v => _v = '?');
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
      }
      catch (error) {
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
  async update(attr, data) {
    console.log('update', attr, data, state.data);
    if (data) {
      if ('timestamp' in data) {
        data['timestamp'] = Date.now();
      }
      const keys = Object.keys(data);
      const values = Object.values(data).map(item => `'${item}'`);
      let query = `UPDATE ${attr.table} SET (${keys}) = (${values}) ${processTokens(attr.where_statement, state.api)};`;
      try {
        const rsp = await state.database._db.run(query, [], false);
        if (this.isWeb) {
          this.sqlite.saveToStore(this.dbname);
        }
        return rsp;
      }
      catch (error) {
        console.log(error);
      }
      return;
    }
  }
}

const Device = registerPlugin('Device', {
    web: () => import('./web-db42dee1.js').then(m => new m.DeviceWeb()),
});

/// <reference types="@capacitor/cli" />

const SplashScreen = registerPlugin('SplashScreen', {
    web: () => import('./web-8b9e2d6c.js').then(m => new m.SplashScreenWeb()),
});

const App = registerPlugin('App', {
    web: () => import('./web-a3d52e74.js').then(m => new m.AppWeb()),
});

const buddypress = {
  root: async () => {
    await customElements.whenDefined('app-root');
    return document.querySelector('app-root');
  },
  joinGroup: async (id) => {
    const root = await buddypress.root();
    const api = await root.getApi();
    const baseUrl = api.api;
    const headers = Object.assign(Object.assign({}, await getAuthHeaders()), { 'Content-Type': 'application/json' });
    const userId = await getUserId();
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/groups/${id}/members?user_id=${userId}`, {
      method: 'POST',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    if (rsp.status >= 400) {
      throw rsp.json();
    }
    else {
      api.is_user_member = true;
      await root.setApi(api);
    }
  },
  leaveGroup: async (id) => {
    const root = await buddypress.root();
    const api = await root.getApi();
    const baseUrl = api.api;
    const headers = Object.assign(Object.assign({}, await getAuthHeaders()), { 'Content-Type': 'application/json' });
    const userId = await getUserId();
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/groups/${id}/members/${userId}`, {
      method: 'DELETE',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    if (rsp.status >= 400) {
      throw rsp.json();
    }
    else {
      const data = await rsp.json();
      if (data.removed) {
        api.is_user_member = false;
        await root.setApi(api);
      }
    }
  },
  follow: async (id) => {
    console.log(id);
    const root = await buddypress.root();
    const api = await root.getApi();
    const baseUrl = api.api;
    const headers = Object.assign(Object.assign({}, await getAuthHeaders()), { 'Content-Type': 'application/json' });
    const rsp = await bapi(baseUrl, headers, 'POST', `/wp-json/buddypress/v1/friends/follow?user_id=${id}`);
    if (rsp.status >= 400) {
      throw await rsp;
    }
    else {
      const data = await rsp;
      if (data.is_confirmed) {
        api.friendship_status = true;
        api.friendship_status_slug = 'is_friend';
        await customElements.whenDefined('app-profile');
        const el = document.querySelector('app-profile');
        await el.reload(api);
      }
    }
  },
  unfollow: async (id) => {
    console.log(id);
    const root = await buddypress.root();
    const api = await root.getApi();
    const baseUrl = api.api;
    const headers = Object.assign(Object.assign({}, await getAuthHeaders()), { 'Content-Type': 'application/json' });
    const rsp = await bapi(baseUrl, headers, 'POST', `/wp-json/buddypress/v1/friends/unfollow?user_id=${id}`);
    if (rsp.status >= 400) {
      throw await rsp;
    }
    else {
      const data = await rsp;
      if (data.is_confirmed) {
        api.friendship_status = false;
        api.friendship_status_slug = 'not_friend';
        await customElements.whenDefined('app-profile');
        const el = document.querySelector('app-profile');
        await el.reload(api);
      }
    }
  },
  addActivity: async (data) => {
    console.log(data);
    await customElements.whenDefined('app-activity');
    const el = document.querySelector('app-activity');
    await el.postModal();
  },
  addGroupActivity: async (id, data) => {
    console.log(id, data);
    await customElements.whenDefined('app-activity');
    const el = document.querySelector('app-activity');
    await el.postModal({
      component: 'groups',
      type: 'activity_update',
      primary_item_id: id
    }, data);
  }
};
async function bapi(baseUrl, headers, method, path) {
  var request = new Request(`${baseUrl}${path}`, {
    method: method,
    headers: new Headers(headers),
  });
  const rsp = await fetch(request);
  if (rsp.status >= 400) {
    throw await rsp.json();
  }
  else {
    return await rsp.json();
  }
}
async function getUserId() {
  var _a;
  const userData = (await Preferences.get({ key: 'auth' })).value;
  return (_a = JSON.parse(userData)) === null || _a === void 0 ? void 0 : _a.user_id;
}
async function getAuthHeaders() {
  const userData = (await Preferences.get({ key: 'auth' })).value;
  const token = userData ? await JSON.parse(userData).token : false;
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

const apppresser = {
  // Refresh auth, gets and saves udated user data.
  refreshAuth: async (url) => {
    console.log('auth refresh');
    const { value } = await Preferences.get({ key: 'auth' });
    const auth = JSON.parse(value);
    const headers = { 'Authorization': `Bearer ${auth.token}`, 'Content-Type': 'application/json' };
    var request = new Request(url, {
      method: 'POST',
      headers: new Headers(headers)
    });
    const response = await fetch(request);
    const rsp = await response.json();
    console.log(rsp);
    await Preferences.set({ key: 'auth', value: JSON.stringify(rsp) });
  },
  // Sets a preference in the app preferences.
  setPreference: async (key, value) => {
    console.log(key, value);
    await Preferences.set({ key: key, value: JSON.stringify(value) });
  },
  // Gets a preference from the app preferences.
  getPreference: async (key) => {
    console.log(key);
    const { value } = await Preferences.get({ key: key });
    return value ? JSON.parse(value) : false;
  },
  // Removes a preference in the app preferences.
  removePreference: async (key) => {
    console.log(key);
    return await Preferences.remove({ key: key });
  },
  setTransient: async (key, value) => {
    state.transients[key] = value;
  },
  setState: async (key, value) => {
    state[key] = value;
  },
  // Adjust the devices text zoom settings.
  textSize: async (value) => {
    console.log(value);
  },
  openDB: async () => {
    await customElements.whenDefined('app-root');
    const root = document.querySelector('app-root');
    const db = await root.openDatabase();
    return db;
  },
  // Update and reload inputs by passing the input name from the field in the app builder.
  updateInput: async (input, value) => {
    await customElements.whenDefined('app-input');
    const inputElement = document.querySelector(`#${input}`);
    if (inputElement) {
      await inputElement.updateInput(input, value);
    }
  },
  // Reeload inputs by passing the input name from the field in the app builder.
  reloadInput: async (input) => {
    await customElements.whenDefined('app-input');
    const inputElement = document.querySelector(`#${input}`);
    if (inputElement) {
      await inputElement.reloadInput(input);
    }
  },
  alert: async (data) => {
    console.log(data);
    const alert = document.createElement('ion-alert');
    alert.header = data.header || '';
    alert.subHeader = data.subheader || '';
    alert.message = data.message || '';
    alert.buttons = data.buttons || ['OK'];
    document.body.appendChild(alert);
    await alert.present();
  },
  modal: async (data) => {
    const block = state.data['modals'].filter(function (obj) {
      return obj.blockName === 'acf/modal' && obj.attrs.data.modal_name === data.name;
    })
      .map(function (obj) {
      return obj;
    });
    const modal = await modalController.create({
      component: 'acf-modal',
      componentProps: { data: block[0], api: {} }
    });
    modal.present();
  },
  dismissModal: async () => {
    await customElements.whenDefined('ion-modal');
    const modal = document.querySelector('ion-modal');
    if (modal) {
      await modal.dismiss();
    }
  },
  router: {
    push: async (route, animation = 'push') => {
      if (route) {
        await customElements.whenDefined('ion-router');
        const el = document.querySelector('ion-router');
        console.log(el);
        if (el) {
          await el.push(route, animation);
        }
      }
    },
    back: async () => {
      console.log('router back');
      await customElements.whenDefined('ion-router');
      const el = document.querySelector('ion-router');
      if (el) {
        await el.back();
      }
    }
  },
  repeater: {
    reload: async (id) => {
      if (id) {
        const el = document.querySelector(`#${id}`);
        if (el) {
          await el.reload();
        }
        return;
      }
    },
    filter: async (id, query) => {
      if (id) {
        const el = document.querySelector(`#${id}`);
        if (el) {
          await el.filter(query);
        }
      }
    }
  }
};

const name = "@aparajita/capacitor-biometric-auth";
const version = "4.0.0";
const info = {
	name: name,
	version: version
};

var BiometryType;
(function (BiometryType) {
    /**
     * No biometry is available
     */
    BiometryType[BiometryType["none"] = 0] = "none";
    /**
     * iOS Touch ID is available
     */
    BiometryType[BiometryType["touchId"] = 1] = "touchId";
    /**
     * iOS Face ID is available
     */
    BiometryType[BiometryType["faceId"] = 2] = "faceId";
    /**
     * Android fingerprint authentication is available
     */
    BiometryType[BiometryType["fingerprintAuthentication"] = 3] = "fingerprintAuthentication";
    /**
     * Android face authentication is available
     */
    BiometryType[BiometryType["faceAuthentication"] = 4] = "faceAuthentication";
    /**
     * Android iris authentication is available
     */
    BiometryType[BiometryType["irisAuthentication"] = 5] = "irisAuthentication";
})(BiometryType || (BiometryType = {}));
/**
 * If the `authenticate()` method throws an exception, the error object
 * contains a .code property which will contain one of these strings,
 * indicating what the error was.
 *
 * See https://developer.apple.com/documentation/localauthentication/laerror
 * for a description of each error code.
 */
var BiometryErrorType;
(function (BiometryErrorType) {
    BiometryErrorType["none"] = "";
    BiometryErrorType["appCancel"] = "appCancel";
    BiometryErrorType["authenticationFailed"] = "authenticationFailed";
    BiometryErrorType["invalidContext"] = "invalidContext";
    BiometryErrorType["notInteractive"] = "notInteractive";
    BiometryErrorType["passcodeNotSet"] = "passcodeNotSet";
    BiometryErrorType["systemCancel"] = "systemCancel";
    BiometryErrorType["userCancel"] = "userCancel";
    BiometryErrorType["userFallback"] = "userFallback";
    BiometryErrorType["biometryLockout"] = "biometryLockout";
    BiometryErrorType["biometryNotAvailable"] = "biometryNotAvailable";
    BiometryErrorType["biometryNotEnrolled"] = "biometryNotEnrolled";
    BiometryErrorType["noDeviceCredential"] = "noDeviceCredential";
})(BiometryErrorType || (BiometryErrorType = {}));
class BiometryError {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
}

const kBiometryTypeNameMap = {
    [BiometryType.none]: '',
    [BiometryType.touchId]: 'Touch ID',
    [BiometryType.faceId]: 'Face ID',
    [BiometryType.fingerprintAuthentication]: 'Fingerprint Authentication',
    [BiometryType.faceAuthentication]: 'Face Authentication',
    [BiometryType.irisAuthentication]: 'Iris Authentication'
};
/**
 * Return a human-readable name for a BiometryType.
 */
// eslint-disable-next-line import/prefer-default-export
function getBiometryName(type) {
    return kBiometryTypeNameMap[type] || '';
}

console.log(`loaded ${info.name} v${info.version}`);
const proxy = registerPlugin('BiometricAuthNative', {
    web: async () => import('./web-82604119.js').then((module) => new module.BiometricAuthWeb()),
    ios: async () => import('./native-167d6bcb.js').then((module) => new module.BiometricAuthNative(proxy)),
    android: async () => import('./native-167d6bcb.js').then((module) => new module.BiometricAuthNative(proxy))
});

/**
 * Check if biometrics is available
 *
 * @returns boolean
 */
async function checkBioMetrics() {
  //await BiometricAuth.setBiometryType('faceId');
  const bio = await proxy.checkBiometry();
  console.log('bio', bio);
  return bio.isAvailable;
}
/**
 * Authenticate with biometrics
 *
 * @returns boolean
 */
async function authBiometrics() {
  //await BiometricAuth.setBiometryType('faceId');
  try {
    await proxy.authenticate({
      reason: 'Log into app.',
      cancelTitle: 'Cancel This'
    });
    console.log('bioauth successful');
    updateResumeTime();
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}
/**
 * Resume biometrics check after 5 minutes
 */
function resumeBioMetrics() {
  console.log('resumeBioMetrics');
  checkResumeTime();
}
async function checkResumeTime() {
  const { value } = await Preferences.get({ key: 'resumetimestamp' });
  console.log('resumetimestampsssss', parseInt(value));
  const diff = timestamp_diff(value, 5);
  console.log(diff);
  if (diff > 5) {
    checkBioMetrics();
  }
}
/**
 * Update resume time
 */
async function updateResumeTime() {
  const timestamp = Date.now();
  await Preferences.set({ key: 'resumetimestamp', value: `${timestamp}` });
  console.log(timestamp);
}
/**
 * Get timestamp difference in minutes
 *
 * @param timestamp
 * @param _diff
 * @returns number
 */
function timestamp_diff(timestamp, _diff) {
  const today = Date.now();
  var difference = today - timestamp;
  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;
  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;
  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;
  var secondsDifference = Math.floor(difference / 1000);
  console.log('difference = ' +
    daysDifference + ' day/s ' +
    hoursDifference + ' hour/s ' +
    minutesDifference + ' minute/s ' +
    secondsDifference + ' second/s ');
  return minutesDifference;
}

const appRootCss = "";

const AppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.biometrics = true;
    this.resume = () => {
      resumeBioMetrics();
    };
    this.data = undefined;
  }
  componentWillLoad() {
    const mode = Build.isDev ? 'dev mode' : 'production';
    console.log(`I'm running in ${mode}`);
    this.loadJS();
    this.getApp();
    setTimeout(async () => {
      await this.authenticate();
      const db = new DatabaseService();
      await db.initialize();
      await db.load();
      console.log('DatabaseService', state.database);
      SplashScreen.hide();
      if (this.biometrics) {
        App.addListener('resume', () => {
          this.resume();
        });
      }
    }, 500);
  }
  async loadJS() {
    window.bp = buddypress;
    window.appp = apppresser;
  }
  async openDatabase() {
    console.log('openDatabase', state.database);
    //await db.deleteDb();
    return state.database;
  }
  async setTransient(name, data) {
    if (name) {
      state.transients[name] = data;
      state.transients = Object.assign({}, state.transients);
    }
  }
  async getTransient(name) {
    return name && state.transients[name] ? await state.transients[name] : undefined;
    // if (name && state.transients[name]) {
    //   return await state.transients[name];
    // } else {
    //   return;
    // }
  }
  async setApi(data) {
    if (data) {
      state.api = Object.assign({}, data);
    }
  }
  async getApi() {
    if (state.api) {
      return await state.api;
    }
    else {
      return;
    }
  }
  dismissPopover(e) {
    const popover = document.querySelector('ion-popover');
    if (popover) {
      popover.dismiss();
    }
    ;
    const alert = document.querySelector('ion-alert');
    if (alert) {
      alert.dismiss();
    }
    const modal = document.querySelector('ion-modal');
    if (modal) {
      modal.dismiss();
    }
    console.log(e);
  }
  async authenticate() {
    const { value } = await Preferences.get({ key: 'auth' });
    state.auth = value ? true : false;
  }
  async emitActionEvent(event, data) {
    //console.log('action', event, data);
    var fn = window[event];
    if (typeof fn === "function")
      fn(data);
  }
  async getApp() {
    const info = await Device.getInfo();
    let data;
    if ('web' === info.platform) {
      const rsp = await fetch(this.getQueryVariable("url"));
      data = await rsp.json();
    }
    else {
      const rsp = await fetch('/assets/app.json');
      data = await rsp.json();
    }
    const globals = data.theme_globals;
    for (const key in globals) {
      document.documentElement.style.setProperty(key, globals[key]);
    }
    const colors = data.theme_colors;
    for (const key in colors) {
      this.appp_create_style_from_properties(key);
      for (const color in colors[key]) {
        document.documentElement.style.setProperty(color, colors[key][color]);
      }
    }
    this.data = Object.assign({}, data);
    state.data = Object.assign({}, data);
    //this.renderSideMenu();
  }
  appp_create_style_from_properties(prop) {
    const css = `.ion-color-${prop} {
         --ion-color-base: var(--ion-color-${prop});
         --ion-color-base-rgb: var(--ion-color-${prop}-rgb);
         --ion-color-contrast: var(--ion-color-${prop}-contrast);
         --ion-color-contrast-rgb: var(--ion-color-${prop}-contrast-rgb);
         --ion-color-shade: var(--ion-color-${prop}-shade);
         --ion-color-tint: var(--ion-color-${prop}-tint);
     }`;
    var style = document.createElement('style');
    style.innerText = css;
    document.head.appendChild(style);
  }
  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
  }
  renderSideMenu() {
    if (this.data.side_menu) {
      const attr = this.data.side_menu.attrs.data;
      if (this.data && attr.javascript !== '') {
        var JS = document.createElement('script');
        JS.text = attr.javascript;
        this.el.appendChild(JS);
      }
      const prefsArray = attr.preferences.split(',');
      prefsArray.map(async (pref) => {
        const { value } = await Preferences.get({ key: pref.trim() });
        if (value !== null) {
          //items[`${pref.trim()}`] = JSON.parse(value);
          state.preferences[`${pref.trim()}`] = JSON.parse(value);
        }
      });
      return (this.data.side_menu.innerBlocks.map(block => (renderComponent(block))));
    }
  }
  renderRoute(item) {
    const attr = item.attrs.data;
    if (this.data.app_attrs.biometric_auth && !state.auth) {
      console.log('attr', this.data.app_attrs.biometric_auth);
      console.log('attr', this.data.app_attrs.biometric_auth_view);
      return [
        h("ion-route-redirect", { from: "/", to: this.data.app_attrs.biometric_auth_view })
      ];
    }
    if ('unauthenticated' === attr.visibility && !state.auth) {
      return [
        h("ion-route", { url: 'data' in item.attrs ? attr.view_route : '/' + item.attrs.id, component: "acf-view", componentProps: { data: item } }),
        attr.path && h("ion-route", { url: 'data' in item.attrs ? attr.view_route + attr.path : '/' + item.attrs.id, component: "acf-view", componentProps: { data: item } })
      ];
    }
    if ('authenticated' === attr.visibility && state.auth) {
      return [
        h("ion-route", { url: 'data' in item.attrs ? attr.view_route : '/' + item.attrs.id, component: "acf-view", componentProps: { data: item } }),
        attr.path && h("ion-route", { url: 'data' in item.attrs ? attr.view_route + attr.path : '/' + item.attrs.id, component: "acf-view", componentProps: { data: item } })
      ];
    }
    if ('visible' === attr.visibility) {
      return [
        h("ion-route", { url: 'data' in item.attrs ? attr.view_route : '/' + item.attrs.id, component: "acf-view", componentProps: { data: item } }),
        attr.path && h("ion-route", { url: 'data' in item.attrs ? attr.view_route + attr.path : '/' + item.attrs.id, component: "acf-view", componentProps: { data: item } })
      ];
    }
  }
  async back() {
    await customElements.whenDefined('ion-router');
    const el = document.querySelector('ion-router');
    if (el) {
      console.log('back method', window.history, el);
      el.back();
    }
  }
  render() {
    return (h("ion-app", null, h("ion-router", { useHash: false }, this.data && this.data['views'].map(item => (this.renderRoute(item)))), h("ion-split-pane", { "content-id": "main" }, this.data && h("ion-menu", { "content-id": "main", type: "push", disabled: !this.data.side_menu }, this.data.side_menu && this.data.side_menu.attrs.data.hide_toolbar !== '1' && h("ion-header", null, h("ion-toolbar", { color: this.data && this.data.side_menu.attrs.data.toolbar_color }, h("ion-buttons", { slot: "start" }, this.data.side_menu.attrs.data.left_buttons.length > 0 && this.data.side_menu.attrs.data.left_buttons.map(button1 => (renderLeftButtons(button1)))), h("ion-title", null, this.data.side_menu.attrs && renderTitle(this.data.side_menu)), h("ion-buttons", { slot: "end" }, this.data.side_menu.attrs.data.right_buttons.length > 0 && this.data.side_menu.attrs.data.right_buttons.map(button => (renderRightButtons(button)))))), h("ion-content", { color: this.data.side_menu && this.data.side_menu.attrs.data.background }, this.renderSideMenu())), h("ion-nav", { id: "main", swipeGesture: false }))));
  }
  get el() { return getElement(this); }
};
AppRoot.style = appRootCss;

export { App as A, BiometryType as B, BiometryErrorType as a, BiometryError as b, AppRoot as c, getBiometryName as g };
