6urnout, [13.06.2025 17:12]
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MinesGame() {
  const [balance, setBalance] = useState<number>(45189.51);
  const [bet, setBet] = useState<number>(16);
  const [minesCount, setMinesCount] = useState<number>(3);
  const [maxWin, setMaxWin] = useState<number>(35144);
  const [grid, setGrid] = useState<Array<string | null>>(Array(25).fill(null));
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<string>('');

  // Размещение мин
  const placeMines = (clickedIndex: number) => {
    const minesPositions: number[] = [];
    while (minesPositions.length < minesCount) {
      const randomPos = Math.floor(Math.random() * 25);
      if (randomPos !== clickedIndex && !minesPositions.includes(randomPos)) {
        minesPositions.push(randomPos);
      }
    }
    return minesPositions;
  };

  // Обработка клика по клетке
  const handleCellClick = (index: number) => {
    if (gameOver || grid[index] !== null) return;

    const mines = placeMines(index);
    if (mines.includes(index)) {
      setGameOver(true);
      setGrid((prev) => {
        const newGrid = [...prev];
        mines.forEach((mine) => (newGrid[mine] = '💣'));
        return newGrid;
      });
    } else {
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[index] = '💰';
        return newGrid;
      });
      setBalance((prev) => prev + bet * 1.5); // Условный выигрыш
    }
  };

  // Пополнение баланса
  const handleDeposit = () => {
    if (!depositAmount) return;
    setBalance((prev) => prev + parseFloat(depositAmount));
    setIsDepositOpen(false);
    setDepositAmount('');
  };

  return (
    <div className="min-h-screen bg-[#1e1e2d] text-white p-4">
      {/* Шапка */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-gray-400">Назад</button>
        <div className="flex items-center space-x-4">
          <button 
            className="bg-[#2d2d3a] px-4 py-2 rounded-lg font-bold"
            onClick={() => setIsDepositOpen(true)}
          >
            {balance.toLocaleString('ru-RU')} ₽
          </button>
          <button className="bg-[#2d2d3a] px-4 py-2 rounded-lg">Пополнить</button>
        </div>
      </div>

      {/* Пополнение баланса (модальное окно) */}
      {isDepositOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2d2d3a] p-6 rounded-lg w-80"
          >
            <h3 className="text-xl font-bold mb-4">Пополнить баланс</h3>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Сумма"
              className="w-full bg-[#1e1e2d] p-2 rounded mb-4"
            />
            <div className="flex space-x-2">
              <button 
                onClick={handleDeposit}
                className="bg-green-600 px-4 py-2 rounded-lg flex-1"
              >
                Подтвердить
              </button>
              <button 
                onClick={() => setIsDepositOpen(false)}
                className="bg-red-600 px-4 py-2 rounded-lg flex-1"
              >
                Отмена
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Игровое поле */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">SAUEMINES</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <span className="text-gray-400">Live</span>
          <span className="text-gray-400">Мои</span>
        </div>

        <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto mb-8">
          {grid.map((cell, index) => (
            <motion.button
              key={index}

6urnout, [13.06.2025 17:12]
whileTap={{ scale: 0.95 }}
              onClick={() => handleCellClick(index)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                cell === null ? 'bg-[#2d2d3a]' : cell === '💰' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {cell || '?'}
            </motion.button>
          ))}
        </div>

        <div className="bg-[#2d2d3a] p-4 rounded-lg max-w-md mx-auto mb-6">
          <div className="flex justify-between mb-2">
            <span>Макс. выигрыш</span>
            <span className="font-bold">{maxWin.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Ловушек</span>
            <span className="font-bold">{minesCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              className="w-20 bg-[#1e1e2d] p-2 rounded"
            />
            <button className="bg-green-600 px-6 py-2 rounded-lg font-bold">
              Играть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
