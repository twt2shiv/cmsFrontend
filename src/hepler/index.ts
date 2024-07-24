

export const transformCategory= (data: any[]) => {
    if(Array.isArray(data)){
      return data.map((item) => ({
        label: item.name || item,
        value: item.name || item,
      }));
    }
    return []
  };