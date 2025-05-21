export enum GraphqlErrorCode {
   /**
    * Стандартная ошибка GraphQL — пользователь ввел неправильные данные.
    * Используется при валидации форм (например, пустые поля, неверный email).
    */
   BAD_USER_INPUT = 'BAD_USER_INPUT',

   /**
    * Пользователь не найден в системе.
    * Используется при логине, поиске профиля и т.д.
    */
   USER_NOT_FOUND = 'USER_NOT_FOUND',

   /**
    * Email уже существует.
    * Используется при регистрации, когда email занят.
    */
   EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',

   /**
    * JWT или refresh токен просрочен.
    * Используется при попытке валидации просроченного токена.
    */
   TOKEN_EXPIRED = 'TOKEN_EXPIRED',

   /**
    * Аккаунт пользователя деактивирован (например, администратором).
    */
   ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',

   /**
    * Не заполнены обязательные поля формы.
    */
   MISSING_FIELDS = 'MISSING_FIELDS',

   /**
    * Некорректный формат email.
    */
   EMAIL_INVALID = 'EMAIL_INVALID',

   /**
    * Объект (пользователь, товар и т.д.) не найден.
    */
   RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

   /**
    * Пользователь не имеет прав для выполнения действия.
    * Например, обычный пользователь пытается выполнить admin-действие.
    */
   NOT_ALLOWED = 'NOT_ALLOWED',

   /**
    * Неверный email или пароль.
    * Объединённая ошибка при логине, без уточнения, что именно не так.
    */
   INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

   /**
    * Пароли не совпадают.
    * Используется при регистрации или смене пароля.
    */
   PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH',

   UNAUTHORIZED = 'UNAUTHORIZED',

   UNAUTHENTICATED = 'UNAUTHENTICATED',

   /**
    * Доступ запрещён (недостаточно прав).
    * Используется для уже аутентифицированных пользователей.
    */
   FORBIDDEN = 'FORBIDDEN',

   /**
    * Внутренняя ошибка сервера.
    * Общая ошибка при сбоях в системе.
    */
   INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',

   TOKEN_REVOKED = 'TOKEN_REVOKED',
}
