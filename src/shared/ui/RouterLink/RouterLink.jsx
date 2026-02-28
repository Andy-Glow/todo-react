// Имитация обычной ссылки

import { BASE_URL } from "@/shared/constants";

const RouterLink = (props) => {
  const { to, children, ...rest } = props;

  const handleClick = (event) => {
    event.preventDefault(); // Отмена стандартного браузерного перехода
    window.history.pushState({}, "", to); // Изменение url-адреса страницы без перезагрузки
    window.dispatchEvent(new PopStateEvent("popstate")); // Ручная генерация события popstate
  };
  return (
    <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default RouterLink;
