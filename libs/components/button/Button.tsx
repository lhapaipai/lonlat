import "./Button.scss";
interface Props {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: "small" | "medium" | "large";
    /**
     * Optional click handler
     */
    onClick?: () => void;

    children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export default function Button({
    primary = false,
    size = "medium",
    backgroundColor,
    children,
    ...props
}: Props) {
    const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
    return (
        <button
            type="button"
            className={["storybook-button", `storybook-button--${size}`, mode].join(" ")}
            style={{ backgroundColor }}
            {...props}
        >
            {children}
        </button>
    );
}
