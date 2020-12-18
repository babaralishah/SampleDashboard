import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadfirebaseService {
  task: AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage) { }

  public async uploadProfileImg(credentials) {

    if (credentials.file instanceof File || credentials.file instanceof Blob) {

      const uploadObs = this.uploadFileAndGetMetadata(
        credentials.file,
        // credentials.user.id,
        // folder
      );

      return uploadObs.downloadUrl$;
    } else {
      const obs = Observable.create(obs => {
        obs.next(credentials.file);
      });
      return obs;
    }
  }

  uploadFileAndGetMetadata(fileToUpload: File) {
    const filePath = `public/file/`;
    const ref = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, fileToUpload);

    return {
      uploadProgress$: this.task.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(this.task, filePath),
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL())
    );
  }

  deleteImage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
