import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ResponseMsg } from '../enum/response-msg.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }
  showSuccess() {
    this.toastr.success('', ResponseMsg.SUCCESS);
  }

  showError(msg) {
    this.toastr.error(msg, ResponseMsg.ERROR)
  }

  showWarning(msg) {
    this.toastr.warning(msg, 'Ops!')
  }
}
