export function hasKey(obj: object, ...keys: string[]) {
    for (var i = 0; i < keys.length; i++) {
        if (!obj || !obj.hasOwnProperty(keys[i])) {
            return false;
        }
        obj = obj[keys[i]];
    }
    return true;
}