import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const db = new Storage({
  size: 1000,
  defaultExpires: null,
  enableCache: true,
  sync: {},
  storageBackend: AsyncStorage,
});

db.hload = async (key) => {
  const ret = await db.load({
    key,
    autoSync: false,
    syncInBackground: false,
    syncParams: {},
  });
  return ret;
};

db.hsave = async (key, data) => {
  await db.save({
    key,
    data,
    expires: null,
  });
};

export default db;