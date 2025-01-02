export class DuplicateUserEmailError extends Error {
  errorCode = "U001"; // 에러 코드

  // 생성자 함수
  constructor(private reason: string, private data: any) {
    super(reason); // 부모 클래스 생성자 호출
    this.reason = reason; // 에러 이유
    this.data = data; // 에러 데이터
  }
}

export class NotFoundUserError extends Error {
  errorCode = "U002"; // 에러 코드

  // 생성자 함수
  constructor(private reason: string, private data: any) {
    super(reason); // 부모 클래스 생성자 호출
    this.reason = reason; // 에러 이유
    this.data = data; // 에러 데이터
  }
}

export class NotFoundPreferencesError extends Error {
  errorCode = "U003"; // 에러 코드

  // 생성자 함수
  constructor(private reason: any, private data: any) {
    super(reason); // 부모 클래스 생성자 호출
    this.reason = reason; // 에러 이유
    this.data = data; // 에러 데이터
  }
}
