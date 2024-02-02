
import { store } from '@/hooks/AdminRedux/AdminStore';

export const rolesValidator = (roles) => {
    console.log(Object.keys(store.getState()?.admin?.admin?.roles).length);
    if(!roles) return true;
    const adminRoles = store.getState()?.admin?.admin?.roles;
    for (const r of roles) {
        if (adminRoles[r]) {
            return true;
        }
    }
    return false;
};

