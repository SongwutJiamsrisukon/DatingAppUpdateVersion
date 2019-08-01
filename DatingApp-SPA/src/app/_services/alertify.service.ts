import { Injectable } from '@angular/core';
declare let alertify: any; // รำคาญTSLintที่แจ้งเส้นใต้หยิกสีแดงเลยประกาศไว้ให้ TSLint มันรู้

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }

/** dialogbox are you sure to do this */
/** okCallback had function type any */
  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) { // if click ok button
        okCallback();
      } else {} // if click cancel
    });
  }
}
