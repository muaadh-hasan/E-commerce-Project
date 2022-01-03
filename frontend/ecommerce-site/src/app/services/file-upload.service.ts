import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , map } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class FileUploadService  {

  // API url
  baseApiUrl = "src/assets/images/products"

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(file):Observable<any> {

      // Create form data
      const formData = new FormData();

      // Store form name as "file" with file data
      formData.append("file", file, file.name);

      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseApiUrl, formData)
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'C:/Users/Moaaz/Documents/GitHub/E-commerce-Project/frontend/ecommerce-site/src/assets/images/products';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<boolean>(endpoint, formData);
      // .map( () => { return true; })
      // .catch((e) => alert('an error : ' + e));
}





}




