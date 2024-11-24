export class DuplicateUserEmailError extends Error {
  errorCode = "U001"; // 에러 코드

  // 생성자 함수
  constructor(reason, data) {
    super(reason); // 부모 클래스 생성자 호출
    this.reason = reason; // 에러 이유
    this.data = data; // 에러 데이터
  }
}
