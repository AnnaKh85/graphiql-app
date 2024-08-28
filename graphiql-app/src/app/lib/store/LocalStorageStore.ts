export enum RECORD_TYPE {
    REST = "REST",
    GRAPHiQL = "GRAPHiQL"
}


export type AppLocalStorage = {
    addToHistory: (recordType: RECORD_TYPE, userId: string, value: Object) => void;
}



export function getAppLocalStorage(): AppLocalStorage {

    function addToHistory(recordType: RECORD_TYPE, userId: string, value: Object) {

    }


    return {
        addToHistory
    };
}

