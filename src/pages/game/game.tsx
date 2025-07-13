import React from "react";
import { Link, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import type { FC } from "react";
import styles from "./game.module.scss";
import { getGame, moveGame } from "../../api/games";
import { type Board, type CellValue, type CurrentMove } from "../../api/types/games.d";

const Game: FC = () => {
	const { id } = useParams();

	const [currentPlayer, setCurrentPlayer] = React.useState<CurrentMove>();
	const [board, setBoard] = React.useState<Board>([]);

	React.useEffect(() => {
		getStateBoard();
	}, []);

	const getStateBoard = () : void => {
		if(id) {
			getGame(id)
				.then((res) => {
					console.log(res);
					setCurrentPlayer(res.currentMove)
					setBoard(res.board);
				});
		}
	}

	const makeMove = (rowId: number, colId: number) : void => {
		console.log(colId, rowId)
		if(id) {
			moveGame(id, {
				p: currentPlayer!,
				x: colId,
				y: rowId,
			})
			.then((res) => {
				console.log(res);
				getStateBoard();
			});
		}
	}

	const fillCell = (cell: CellValue) : string => {
		if(cell === "X") return "X";
		if(cell === "0") return "0";
		return "";
	}

	const sizeCell = () : number => {
		if(board.length === 30) {
			return 25;
		} else if (board.length === 10) {
			return 60;
		} else if (board.length === 5) {
			return 70;
		} else {
			return 80;
		}
	}
	return (
		<div className={styles.game}>
			<div className={styles.header}>
				<Link to="/">
					<MoveLeft />
				</Link>
				<h3>Сейчас ходит: <span>{currentPlayer}</span></h3>
			</div>
			<div className={styles.fieldWrapper}>
				<div className={styles.field}>
					{board.map((row, rowId) => (
						<div key={rowId} className={styles.row}>
							{row.map((cell, colId) => (
								<button 
									key={colId}
									className={styles.cell}
									onClick={() => makeMove(rowId, colId)}
									style={{
										width: sizeCell(),
										height: sizeCell(),
									}}
								>
									{fillCell(cell)}
								</button>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
};

export default Game;
