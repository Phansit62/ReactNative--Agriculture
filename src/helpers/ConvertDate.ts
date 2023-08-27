export function formatDate(dateString:string,type:number) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
   if(type === 1) {
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
   }
   else {
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
   }
  }
  
