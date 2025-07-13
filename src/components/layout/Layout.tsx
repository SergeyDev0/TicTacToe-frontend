import type { FC } from "react";
import type { LayoutProps } from "./types/layout";
import styles from "./Layout.module.scss";

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className={styles.page}>
			{children}
		</div>
	)
};

export default Layout;
