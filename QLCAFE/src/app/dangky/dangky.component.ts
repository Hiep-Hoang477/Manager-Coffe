import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.scss']
})
export class DangkyComponent {
  public maTK: string = '';
  public tenTK: string = '';
  public gioiTinh: string = '';
  public Tk: string = ''; // Tài khoản
  public Mk: string = ''; // Mật khẩu
  public Email: string = '';
  public Phone: string = '';
  public vaiTro: string = 'Khách hàng'; // Đặt vai trò mặc định là 'Khách hàng'
  public message: string = '';
  private count: number = 3; // Khởi tạo biến đếm với giá trị ban đầu là 1

  constructor(private userService: UserService, private router: Router) {}

  dangKy(stockForm: any) {
    if (stockForm.valid) { // Kiểm tra các trường cần thiết
      const newUser = {
        maTK: 'TK' + this.count++, // Sử dụng biến đếm để tạo mã tài khoản duy nhất
        tenTK: this.tenTK,
        gioiTinh: this.gioiTinh,
        Tk: this.Tk,
        Mk: this.Mk,
        Email: this.Email,
        Phone: this.Phone,
        vaiTro: this.vaiTro
      };

      this.userService.dangKy(newUser).subscribe(
        (result: any) => {
          this.message = "Tạo tài khoản thành công";
          this.initializeFields();
          // Điều hướng đến trang khác sau khi đăng ký thành công (nếu cần)
          this.router.navigate(['/dangnhap']);
        },
        (err: any) => {
          this.message = err.msg || 'Đã xảy ra lỗi khi tạo tài khoản';
        }
      );
    } else {
      console.error('Form is in an invalid state!!');
      this.message = "Vui lòng nhập đầy đủ các trường";
    }
  }

  initializeFields() {
    this.maTK = '';
    this.tenTK = '';
    this.gioiTinh = '';
    this.Tk = '';
    this.Mk = '';
    this.Email = '';
    this.Phone = '';
    this.vaiTro = 'Khách hàng';
  }
}