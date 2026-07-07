import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

type Board = (string | null)[];
type Scores = {
  player: number;
  ties: number;
  cpu: number;
};

export default function HomeScreen() {
  const colors = useColors();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState<Scores>({ player: 0, ties: 0, cpu: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [cpuThinking, setCpuThinking] = useState(false);

  // Calculate winner
  const calculateWinner = (squares: Board): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check if board is full
  const isBoardFull = (squares: Board): boolean => squares.every(square => square !== null);

  // CPU AI logic
  const getCpuMove = (currentBoard: Board): number => {
    const availableMoves = currentBoard
      .map((square, index) => (square === null ? index : null))
      .filter(index => index !== null) as number[];

    // Check if CPU can win
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'O';
      if (calculateWinner(testBoard) === 'O') {
        return move;
      }
    }

    // Check if player is about to win (block)
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'X';
      if (calculateWinner(testBoard) === 'X') {
        return move;
      }
    }

    // Prefer center or corners
    const centerCorners = [4, 0, 2, 6, 8].filter(i => availableMoves.includes(i));
    if (centerCorners.length > 0) {
      return centerCorners[Math.floor(Math.random() * centerCorners.length)];
    }

    // Random available move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  // Handle player move
  const handleTilePress = useCallback(
    async (index: number) => {
      if (board[index] || gameOver || !isXNext || cpuThinking) return;

      // Haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const newBoard = [...board];
      newBoard[index] = 'X';
      setBoard(newBoard);

      const playerWinner = calculateWinner(newBoard);
      if (playerWinner === 'X') {
        setWinner('X');
        setGameOver(true);
        setScores(prev => ({ ...prev, player: prev.player + 1 }));
        setTimeout(() => resetBoard(), 1500);
        return;
      }

      if (isBoardFull(newBoard)) {
        setWinner('tie');
        setGameOver(true);
        setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
        setTimeout(() => resetBoard(), 1500);
        return;
      }

      setIsXNext(false);

      // CPU move with delay
      setCpuThinking(true);
      setTimeout(() => {
        const cpuMoveIndex = getCpuMove(newBoard);
        newBoard[cpuMoveIndex] = 'O';
        setBoard(newBoard);

        const cpuWinner = calculateWinner(newBoard);
        if (cpuWinner === 'O') {
          setWinner('O');
          setGameOver(true);
          setScores(prev => ({ ...prev, cpu: prev.cpu + 1 }));
          setTimeout(() => resetBoard(), 1500);
          setCpuThinking(false);
          return;
        }

        if (isBoardFull(newBoard)) {
          setWinner('tie');
          setGameOver(true);
          setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
          setTimeout(() => resetBoard(), 1500);
          setCpuThinking(false);
          return;
        }

        setIsXNext(true);
        setCpuThinking(false);
      }, 500);
    },
    [board, gameOver, isXNext, cpuThinking]
  );

  // Reset board but keep scores
  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  }, []);

  // Restart game (clear board and reset scores)
  const handleRestart = useCallback(() => {
    resetBoard();
  }, [resetBoard]);

  const getTurnText = (): string => {
    if (gameOver) {
      if (winner === 'X') return 'YOU WIN';
      if (winner === 'O') return 'CPU WINS';
      return 'TIE';
    }
    return isXNext ? 'X TURN' : 'O TURN';
  };

  const getTurnColor = (): string => {
    if (gameOver) {
      if (winner === 'X') return '#31C3BD';
      if (winner === 'O') return '#F2B137';
      return '#A8BFC9';
    }
    return isXNext ? '#31C3BD' : '#F2B137';
  };

  return (
    <ScreenContainer className="p-6 bg-background" containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
        <View className="flex-1 gap-8 justify-between">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            {/* Logo */}
            <View className="flex-row gap-1">
              <Text className="text-3xl font-bold" style={{ color: '#31C3BD' }}>
                X
              </Text>
              <Text className="text-3xl font-bold" style={{ color: '#F2B137' }}>
                O
              </Text>
            </View>

            {/* Turn Indicator */}
            <View
              className="px-6 py-2 rounded-full"
              style={{
                backgroundColor: '#1F3641',
                borderBottomWidth: 4,
                borderBottomColor: '#10212A',
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: getTurnColor() }}
              >
                {getTurnText()}
              </Text>
            </View>

            {/* Restart Button */}
            <Pressable
              onPress={handleRestart}
              style={({ pressed }) => [
                {
                  width: 48,
                  height: 48,
                  backgroundColor: '#A8BFC9',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 4,
                  borderBottomColor: '#10212A',
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-xl font-bold text-background">↻</Text>
            </Pressable>
          </View>

          {/* Game Board */}
          <View className="gap-4">
            {[0, 1, 2].map(row => (
              <View key={row} className="flex-row gap-4 justify-center">
                {[0, 1, 2].map(col => {
                  const index = row * 3 + col;
                  const value = board[index];
                  return (
                    <Pressable
                      key={index}
                      onPress={() => handleTilePress(index)}
                      disabled={!!value || gameOver || !isXNext || cpuThinking}
                      style={({ pressed }) => [
                        {
                          width: 80,
                          height: 80,
                          backgroundColor: '#1F3641',
                          borderRadius: 16,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth: 4,
                          borderBottomColor: '#10212A',
                          opacity: pressed && !value ? 0.8 : 1,
                          transform: [{ scale: pressed && !value ? 0.97 : 1 }],
                        },
                      ]}
                    >
                      {value && (
                        <Text
                          className="text-5xl font-bold"
                          style={{
                            color: value === 'X' ? '#31C3BD' : '#F2B137',
                          }}
                        >
                          {value}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Scoreboard */}
          <View className="flex-row gap-4 justify-between">
            {/* X (You) */}
            <View
              className="flex-1 rounded-lg p-4 items-center justify-center"
              style={{
                backgroundColor: '#1F3641',
                borderBottomWidth: 4,
                borderBottomColor: '#10212A',
              }}
            >
              <Text className="text-xs font-semibold text-muted mb-2">X (YOU)</Text>
              <Text
                className="text-3xl font-bold"
                style={{ color: '#31C3BD' }}
              >
                {scores.player}
              </Text>
            </View>

            {/* Ties */}
            <View
              className="flex-1 rounded-lg p-4 items-center justify-center"
              style={{
                backgroundColor: '#1F3641',
                borderBottomWidth: 4,
                borderBottomColor: '#10212A',
              }}
            >
              <Text className="text-xs font-semibold text-muted mb-2">TIES</Text>
              <Text
                className="text-3xl font-bold"
                style={{ color: '#A8BFC9' }}
              >
                {scores.ties}
              </Text>
            </View>

            {/* O (CPU) */}
            <View
              className="flex-1 rounded-lg p-4 items-center justify-center"
              style={{
                backgroundColor: '#1F3641',
                borderBottomWidth: 4,
                borderBottomColor: '#10212A',
              }}
            >
              <Text className="text-xs font-semibold text-muted mb-2">O (CPU)</Text>
              <Text
                className="text-3xl font-bold"
                style={{ color: '#F2B137' }}
              >
                {scores.cpu}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
