import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TEXT: "text",
};

const TYPES = {
  BUTTON: "button",
  SUBMIT: "submit",
  RESET: "reset",
};

const Button = ({
  onClick,
  children,
  external = false,
  href,
  to,
  variant = VARIANTS.PRIMARY,
  type = TYPES.BUTTON,
  className: additionalClassName,
  disabled = false,
  target,
}) => {
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const className = clsx(
    styles.button,
    styles[variant],
    {
      [styles.disabled]: disabled,
    },
    additionalClassName
  );

  const commonProps = {
    className,
    onClick: handleClick,
    "aria-disabled": disabled,
  };

  if (external) {
    return (
      <a
        {...commonProps}
        href={disabled ? undefined : href}
        rel="noopener noreferrer"
        target={target || "_blank"}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return disabled ? (
      <span {...commonProps}>{children}</span>
    ) : (
      <Link
        {...commonProps}
        to={to}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button {...commonProps} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

Button.VARIANTS = VARIANTS;
Button.TYPES = TYPES;

export default Button;