//email 유효성 검사
export const validateEmail = (value: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return '올바르지 않은 이메일입니다.';
  }
  return '';
};

//username 유효성 검사
export const validateUsername = (value: string) => {
  if (!/^[A-Za-z가-힣]{2,8}$/.test(value)) {
    return '2~8자 이내 영문 또는 한글';
  }
  return '';
};

//password  유효성 검사
export const validatePassword = (value: string) => {
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?`~])[A-Za-z\d!@#$%^&*()\-_=+[\]{};:'",.<>/?`~]{8,16}$/.test(
      value,
    )
  ) {
    return '8~16자, 영문 숫자 특수문자 모두 포함';
  }
  return '';
};

// ReactQuil 에디터 내용 유효성 검사
export const validateEmptyContent = (value: string) => {
  const text = value.replace(/<[^>]*>?/gm, '').trim();
  return text === '';
};
