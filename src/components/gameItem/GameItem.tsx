import { Link } from "react-router-dom";
import type { FC } from "react";
import type { GameItemProps } from "./types/gameItem";
import styles from "./GameItem.module.scss";

const GameItem: FC<GameItemProps> = ({ id, index }) => {
  return (
    <li className={styles.item}>
      <Link to={`/game/${id}`}>
				<span>Размер: 3x3</span> 
				<h3>#{index}</h3>
			</Link>
    </li>
  );
};

export default GameItem;