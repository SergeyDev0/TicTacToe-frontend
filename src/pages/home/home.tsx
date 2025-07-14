import React from "react";
import { useNavigate } from "react-router-dom";
import GameItem from "../../components/gameItem/GameItem";
import { createGame, getGames } from "../../api/games";
import type { FC, FormEvent } from "react";
import type { Games } from "./types/home";
import logo from "../../assets/icons/logo.svg";
import styles from "./home.module.scss";

const BOARD_SIZES = [3, 5, 10, 30] as const;
type BoardSize = typeof BOARD_SIZES[number];
const LINE_SIZES = [3, 4, 5] as const;
type LineSize = typeof LINE_SIZES[number];

const Home: FC = () => {
	const navigate = useNavigate();

	const [games, setGames] = React.useState<Games[]>([]);
	const [chanceReplace, setChanceReplace] = React.useState<number>(1);
	const [movesForReplace, setMovesForReplace] = React.useState<number>(1);
	const [lineToWin, setLineToWin] = React.useState<LineSize>(3);
	const [activeGame, setActiveGame] = React.useState<BoardSize>(3);

	React.useEffect(() => {
		if (activeGame === 3 && lineToWin > 3) {
			setLineToWin(3);
		}
	}, [activeGame, lineToWin]);

	React.useEffect(() => {
		getGames()
			.then((res) => {
				console.log(res);
				setGames(res);
			})
	}, [])

	function handleSubmit (e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		createGame({
			size: activeGame,
			line_to_win: lineToWin,
			chance: chanceReplace,
			step: movesForReplace
		})
			.then((res) => {
				console.log(res);
				navigate(`/game/${res.id}`)
			});

		console.log("chance " + chanceReplace, "moves " + movesForReplace, "lines " + lineToWin, "size " + activeGame)
	}

	const isLineSizeDisabled = (boardSize: BoardSize, lineSize: LineSize) => {
		if (boardSize === 3 && lineSize !== 3) return true;
		if (boardSize === 5 && lineSize === 5) return true;
		return false;
	};

	return (
		<div className={styles.home}>
			<div className={styles.logo}>
				<img src={logo} alt="Logotype" />
				<span>TicTacToe</span>
			</div>
			<div className={styles.gamesWrapper}>
				{games.length > 0 ? (
					<ul className={styles.games}>
						{games.map((game, i) => (
							<GameItem key={game.id} id={game.id} index={i + 1} />
						))}
					</ul>
				) : (
					<div className={styles.empty}>
						<p>Пока нет созданных игр</p>
					</div>
				)}
			</div>
			<form 
				onSubmit={handleSubmit}
				className={styles.createGame}
			>
				<div className={styles.row}>
					<div>
						<label htmlFor="chanceInput">Вероятность замены хода (%)</label>
						<input 
						value={chanceReplace}
						onChange={(event) => {
							let value = Number(event.target.value);
							if (value > 100) value = 100;
							if (value < 1) value = 1;
							setChanceReplace(value);
						}}
						type="text"
						min={1}
						max={100}
						required
					/>
				</div>
				<div>
					<label htmlFor="movesInput">Количество ходов до замены</label>
					<input
						value={movesForReplace}
						onChange={(event) => {
							let value = Number(event.target.value);
							if (value > 100) value = 100;
							if (value < 1) value = 1;
							setMovesForReplace(value);
						}}
						type="text"
						min={1}
						max={100}
						required
					/>
				</div>
			</div>
				<div className={styles.col}>
					<h2 className={styles.title}>Длина линии для выигрыша</h2>
				<ul 
					className={styles.sizeBorads}
					style={{gridTemplateColumns: `repeat(${LINE_SIZES.length}, 1fr)`}}
				>
					{LINE_SIZES.map((size) => (
						<li key={size}>
							<button
								disabled={isLineSizeDisabled(activeGame, size)}
								className={
									lineToWin === size
										? styles.active
										: isLineSizeDisabled(activeGame, size)
											? styles.disabled
											: ""
								}
								onClick={(event) => {
									event.preventDefault();
									setLineToWin(size);
								}}
							>
								{size}
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.col}>
				<h2 className={styles.title}>Размер доски</h2>
				<ul 
					className={styles.sizeBorads}
					style={{gridTemplateColumns: `repeat(${BOARD_SIZES.length}, 1fr)`}}
				>
					{BOARD_SIZES.map((size) => (
						<li key={size}>
							<button
								className={activeGame === size ? `${styles.active}` : ""}
								onClick={(event) => {
									event.preventDefault();
									setActiveGame(size);
								}}
							>
								{size}x{size}
							</button>
						</li>
					))}
				</ul>
			</div>
			<button type="submit">Создать новую игру</button>
		</form>
	</div>
)
};

export default Home;