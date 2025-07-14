import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import type { FC } from "react";
import styles from "./game.module.scss";
import { getGame, moveGame } from "../../api/games";
import { type Board, type CellValue, type CurrentMove, type Result } from "../../api/types/games.d";

const PopupMessage: FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  const [show, setShow] = useState(false);
  const [animationClass, setAnimationClass] = useState<string>("");

  useEffect(() => {
    if (message) {
      setShow(true);
      setAnimationClass(styles["popup-enter"]);
      const appearTimer = setTimeout(() => {
        setAnimationClass(styles["popup-enter-active"]);
      }, 1000);
      const hideTimer = setTimeout(() => {
        setAnimationClass(styles["popup-exit-active"]);
        setTimeout(() => {
          setShow(false);
          onClose();
        }, 300);
      }, 4000);
      return () => {
        clearTimeout(appearTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setShow(false);
      setAnimationClass("");
    }
  }, [message, onClose]);

  if (!show) return null;
  return (
    <div className={`${styles.popup} ${animationClass}`}>
      {message}
    </div>
  );
};

const Game: FC = () => {
	const { id } = useParams();

	const [currentPlayer, setCurrentPlayer] = useState<CurrentMove>();
	const [board, setBoard] = useState<Board>([]);
  const [result, setResult] = useState<Result>("None");
  const [popup, setPopup] = useState<string>("");

	useEffect(() => {
		getStateBoard();
	}, []);

	const getStateBoard = () : void => {
		if(id) {
			getGame(id)
				.then((res) => {
					console.log(res);
					setCurrentPlayer(res.currentMove)
					setBoard(res.board);
					setResult(res.result)
          if (res.result === "Draw") {
            setPopup("Ничья!");
          } else if (res.result === "WinX") {
            setPopup("Победа игрока X");
          } else if (res.result === "WinO") {
            setPopup("Победа игрока O");
          }
				});
		}
	}

	const makeMove = (rowId: number, colId: number) : void => {
		console.log(colId, rowId)
		if(id) {
			moveGame(id, {
				p: currentPlayer!,
				x: rowId,
				y: colId,
			})
			.then((res) => {
				console.log(res);
				getStateBoard();
			});
		}
	}

	const fillCell = (cell: CellValue) : string => {
		if(cell === "X") return "X";
		if(cell === "O") return "O";
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
			<PopupMessage message={popup} onClose={() => setPopup("")} />
			<div className={styles.header}>
				<Link to="/">
					<MoveLeft />
				</Link>
				{(result === "None") ? (
					<h3>Сейчас ходит: <span>{currentPlayer}</span></h3>
				) : (
					<h3>Игра завершена</h3>
				)}
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
										fontSize: sizeCell(),
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