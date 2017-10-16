class DatabaseRepositoryProvider {
    static setModel(key, instance){
        DatabaseRepositoryProvider._items['key'] = null;
    }
}

DatabaseRepositoryProvider._items = {};