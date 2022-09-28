import {Injectable} from "@angular/core";
import {GlobalVariableService} from "./global-variable.service";
import {HttpClient} from "@angular/common/http";
import {Info} from "../models/info";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private gvs: GlobalVariableService,
    private http: HttpClient
  ) {
  }

  // doctor reserve ------------------------------------------------------------------------------------------------------
  getDoctorReserves(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.docReserve + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}})
  }

  getDoctorReserveById(id: any) {
    return this.http.get(this.gvs.docReserve + `/${id}`, {headers: {'Anonymous': ''}});
  }

  searchDoctorReserves(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any, textToSearch: any) {
    return this.http.get(this.gvs.docReserve + '/search' + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}&textToSearch=${textToSearch}`, {headers: {'Anonymous': ''}});
  }

  updateDoctorReserveStatus(id: any, status: any) {
    return this.http.put(this.gvs.docReserve + `/status/${id}?status=${status}`, null);
  }

  getOneDoctorReserve(direction: any, docId: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.oneDocReserve + `/${docId}?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  getOneUserReserve(direction: any, userId: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.oneUserReserve + `/${userId}?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  getAllTransActions(direction: any, pageNo: any, pageSize: any, sortBy: any, type: any) {
    return this.http.get(this.gvs.docReserve + `/transaction?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&type=${type}`, {headers: {'Anonymous': ''}});
  }

  getUserTransActions(direction: any, userId: any, pageNo: any, pageSize: any, sortBy: any, type: any) {
    return this.http.get(this.gvs.docReserve + `/transaction/user/${userId}?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&type=${type}`, {headers: {'Anonymous': ''}});
  }

  getDoctorTransActions(direction: any, docId: any, pageNo: any, pageSize: any, sortBy: any, type: any) {
    return this.http.get(this.gvs.docReserve + `/transaction/doctor/${docId}?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&type=${type}`, {headers: {'Anonymous': ''}});
  }

  // configs ------------------------------------------------------------------------------------------------------
  getInfo(type: string) {
    return this.http.get<Info>(this.gvs.dynaform + `/${type}`, {headers: {'Anonymous': ''}});
  }

  postInfo(body: any) {
    return this.http.post(this.gvs.dynaform + '/create', body);
  }

  getAllInfo() {
    return this.http.get(this.gvs.dynaform, {headers: {'Anonymous': ''}});
  }

  deleteInfo(id: any) {
    return this.http.delete(this.gvs.dynaform + `/delete/${id}`);
  }

  updateInfo(id: any, info: Info) {
    return this.http.put<Info>(this.gvs.dynaform + `/update/${id}`, info);
  }

  reArrangeInfo(body: string[]) {
    return this.http.patch(this.gvs.dynaform + `/arrange`, body);
  }

  uploadFileForInfo(file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.gvs.dynaform + `/upload`, formData);
  }

  // admins  -----------------------------------------------------------------------
  updateAdminProfileImage(id: any, img: File) {
    const fd: FormData = new FormData();
    fd.append('img', img);
    return this.http.patch(this.gvs.adminsUpdateImage + `/${id}`, fd);
  }

  getAdmins(pageNo: any, pageSize: any, sortBy: any) {
    return this.http.get(this.gvs.admins + `?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`);
  }

  getAdminById(id: any) {
    return this.http.get(this.gvs.admins + `/${id}`);
  }

  addAdmin(body: any) {
    return this.http.post(this.gvs.admins, body);
  }

  updateAdmin(id: any, body: any) {
    return this.http.put(this.gvs.updateAdmins + `/${id}`, body);
  }

  changeAdminPassword(id: any, body: any) {
    return this.http.patch(this.gvs.adminsUpdatePassword + `/${id}`, body);
  }

  adminCheckField(type: any, value: any) {
    return this.http.get(this.gvs.adminsCheckField + `?type=${type}&value=${value}`);
  }

  // doctors -----------------------------------------------------------------------
  getDoctors(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.doctors + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  getDoctorById(id: any) {
    return this.http.get(this.gvs.doctors + `/${id}`, {headers: {'Anonymous': ''}});
  }

  addDoc(body: any) {
    return this.http.post(this.gvs.doctors + '/create', body);
  }

  putStatusDoc(id: any, status: any, body: any) {
    return this.http.put(this.gvs.doctors + `/update/status/${id}?status=${status}`, body);
  }

  putInsureDoc(id: any, body: any) {
    return this.http.put(this.gvs.doctors + `/update/${id}/insurance`, body);
  }

  putFieldsDoc(id: any, body: any) {
    return this.http.put(this.gvs.doctors + `/update/${id}/medicalField`, body);
  }

  putUpdateDoc(id: any, body: any) {
    return this.http.put(this.gvs.doctors + `/update/${id}`, body);
  }

  patchDoctorProfileImage(id: any, image: File) {
    const fd: FormData = new FormData();
    fd.append('image', image);
    return this.http.patch(this.gvs.doctors + `/update/image/${id}`, fd);
  }

  searchDoctor(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any, textToSearch: any) {
    return this.http.get(this.gvs.doctors + `/search?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}&textToSearch=${textToSearch}`, {headers: {'Anonymous': ''}});
  }

  // type: OFFLINE, ONLINE
  getDoctorTimesheet(id: any, type: any) {
    return this.http.get(this.gvs.doctors + `/${id}/timesheet?type=${type}`, {headers: {'Anonymous': ''}});
  }

  // users -----------------------------------------------------------------------
  getUsers(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.users + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  getUsersById(id: any) {
    return this.http.get(this.gvs.users + `/${id}`, {headers: {'Anonymous': ''}});
  }

  getQuestionById(id: any) {
    return this.http.get(this.gvs.users + `/question/${id}`, {headers: {'Anonymous': ''}});
  }

  // status: VERIFIED, BANNED
  updateUserStatus(id: any, status: any) {
    // @ts-ignore
    return this.http.put(this.gvs.users + `/update/status/${id}?status=${status}`);
  }

  // comments  -----------------------------------------------------------------------
  getComments(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.comments + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  searchAllComments(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any, textToSearch: any) {
    return this.http.get(this.gvs.comments + `/search?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}&textToSearch=${textToSearch}`, {headers: {'Anonymous': ''}});
  }

  getComment(id: any) {
    return this.http.get(this.gvs.comments + `/${id}`, {headers: {'Anonymous': ''}});
  }

  deleteComments(id: any) {
    return this.http.delete(this.gvs.comments + `/${id}`);
  }

  putComments(id: any, status: any, body: any) {
    return this.http.put(this.gvs.comments + `/status/${id}?status=${status}`, body);
  }

  getUserComments(id: any, direction: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.comments + `/user/${id}?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  // Medical-fields -----------------------------------------------------------------------
  getAllMedical_Fields(direction: any, sortBy: any) {
    return this.http.get(this.gvs.medical + `?direction=${direction}&sortBy=${sortBy}`, {headers: {'Anonymous': ''}});
  }

  deleteMedical_Fields(id: any) {
    return this.http.delete(this.gvs.medical + `/${id}`);
  }

  postMedical_Fields(body: any) {
    return this.http.post(this.gvs.medical + '/create', body);
  }

  putMedical_Fields(id: any, body: any) {
    return this.http.put(this.gvs.medical + `/update/${id}`, body);
  }

  // insurance  -----------------------------------------------------------------------
  getInsuranceList(direction: any, pageNo: any, pageSize: any, sortBy: any) {
    return this.http.get(this.gvs.insurance + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`, {headers: {'Anonymous': ''}});
  }

  deleteInsurance(id: any) {
    return this.http.delete(this.gvs.insurance + `/${id}`);
  }

  createInsurance(name: any, logo: File) {
    const fd: FormData = new FormData();
    fd.append('logo', logo);
    fd.append('name', name);
    return this.http.post(this.gvs.insurance + `/create`, fd);
  }

  updateInsurance(id: any, logo: File, name: any) {
    if (logo) {
      const fd: FormData = new FormData();
      fd.append('logo', logo);
      return this.http.put(this.gvs.insurance + `/update/${id}?name=${name}`, fd);
    } else {
      // @ts-ignore
      return this.http.put(this.gvs.insurance + `/update/${id}?name=${name}`);
    }
  }

  // FAQ  -----------------------------------------------------------------------
  getFAQs() {
    return this.http.get(this.gvs.faq, {headers: {'Anonymous': ''}});
  }

  reArrangeFAQs(body: any) {
    return this.http.patch(this.gvs.faq + `/arrange/faq`, body);
  }

  createFAQ(body: any) {
    return this.http.post(this.gvs.faq, body);
  }

  updateFAQ(id: any, body: any) {
    return this.http.put(this.gvs.faq + `/update/${id}`, body);
  }

  deleteFAQ(id: any) {
    return this.http.delete(this.gvs.faq + `/${id}`);
  }

  // coupon  -----------------------------------------------------------------------
  getCoupons(direction: any, pageNo: any, pageSize: any, sortBy: any) {
    return this.http.get(this.gvs.coupon + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`, {headers: {'Anonymous': ''}});
  }

  deleteCoupon(id: any) {
    return this.http.delete(this.gvs.coupon + `/${id}`);
  }

  createCoupon(body: any) {
    return this.http.post(this.gvs.coupon + '/create', body);
  }

  isCouponActive(code: any) {
    return this.http.get(this.gvs.coupon + `/isActive?code=${code}`, {headers: {'Anonymous': ''}});
  }

  updateCoupon(id: any, body: any) {
    return this.http.put(this.gvs.coupon + `/update/${id}`, body);
  }

  // Q&A -----------------------------------------------------------------------
  getQA(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.questionAndAnswer + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  getQAById(id: any) {
    return this.http.get(this.gvs.questionAndAnswer + `/${id}`, {headers: {'Anonymous': ''}});
  }

  searchQA(direction: any, pageNo: any, pageSize: any, sortBy: any, status: any, textToSearch: any) {
    return this.http.get(this.gvs.questionAndAnswer + `/search?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}&textToSearch=${textToSearch}`, {headers: {'Anonymous': ''}});
  }

  updateQAStatus(id: any, status: any) {
    return this.http.put(this.gvs.questionAndAnswer + `/status/${id}?status=${status}`, null);
  }

  getOneDoctorQA(direction: any, docId: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.oneDocQA + `/${docId}?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  getOneUserQA(direction: any, userId: any, pageNo: any, pageSize: any, sortBy: any, status: any) {
    return this.http.get(this.gvs.oneUserQA + `/${userId}?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}`, {headers: {'Anonymous': ''}});
  }

  getQaAnswers(qaId: any) {
    return this.http.get(this.gvs.questionAndAnswer + `/answer/${qaId}`, {headers: {'Anonymous': ''}});
  }

  // Blog -----------------------------------------------------------------------
  getBlogs(direction: any, pageNo: any, pageSize: any, sortBy: any) {
    return this.http.get(this.gvs.blog + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`, {headers: {'Anonymous': ''}});
  }

  searchBlogs(direction: any, pageNo: any, pageSize: any, sortBy: any, textToSearch: any) {
    return this.http.get(this.gvs.blog + `/search?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&textToSearch=${textToSearch}`, {headers: {'Anonymous': ''}});
  }

  getBlogById(id: any) {
    return this.http.get(this.gvs.blog + `/${id}`, {headers: {'Anonymous': ''}});
  }

  createBlog(body: any) {
    return this.http.post(this.gvs.blog + '/create', body);
  }

  updateBlog(id: any, body: any) {
    return this.http.put(this.gvs.blog + `/update/${id}`, body);
  }

  updateBlogCover(id: any, img: File) {
    const fd: FormData = new FormData();
    fd.append('image', img);
    return this.http.patch(this.gvs.blog + `/update/cover/${id}`, fd);
  }

  updateBlogVideo(id: any, video: File) {
    const fd: FormData = new FormData();
    fd.append('video', video);
    return this.http.patch(this.gvs.blog + `/update/video/${id}`, fd);
  }

  // Blog Category -----------------------------------------------------------------------
  getBlogCategories(direction: any, pageNo: any, pageSize: any, sortBy: any) {
    return this.http.get(this.gvs.blogCategory + `?direction=${direction}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`, {headers: {'Anonymous': ''}});
  }

  getBlogCategoriesById(id: any) {
    return this.http.get(this.gvs.blogCategory + `/${id}`, {headers: {'Anonymous': ''}});
  }

  deleteBlogCategoriesById(id: any) {
    return this.http.delete(this.gvs.blogCategory + `/${id}`, {headers: {'Anonymous': ''}});
  }

  postCategory(request: any) {
    return this.http.post(this.gvs.blogCategory + '/create', request);
  }

  putCategory(request: any) {
    return this.http.put(this.gvs.blogCategory + '/update', request);
  }
}
