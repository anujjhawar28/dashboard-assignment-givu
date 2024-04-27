export default function useUtils() {
    const removeKeysFromArray = (arrayOfObjects: any[], keysToRemove: any[]): any[] => {
        const newArray = arrayOfObjects.map((obj: any) => {
            const newObj = { ...obj };

            keysToRemove.forEach(key => {
                delete newObj[key];
            });

            return newObj;
        });

        return newArray;
    }

    return {
        removeKeysFromArray
    }
}