import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TicTacToe extends JFrame implements ActionListener {

    private JButton[] buttons = new JButton[9];
    private JLabel messageLabel;
    private boolean playerXTurn = true;
    private int movesMade = 0;

    public TicTacToe() {
        setTitle("Tic Tac Toe");
        setSize(400, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        JPanel boardPanel = new JPanel();
        boardPanel.setLayout(new GridLayout(3, 3));
        boardPanel.setBackground(Color.BLACK);

        for (int i = 0; i < 9; i++) {
            buttons[i] = new JButton();
            buttons[i].setFont(new Font("Arial", Font.BOLD, 60));
            buttons[i].setFocusPainted(false);
            buttons[i].addActionListener(this);
            buttons[i].setBackground(Color.WHITE);
            boardPanel.add(buttons[i]);
        }

        messageLabel = new JLabel("Player X's Turn", SwingConstants.CENTER);
        messageLabel.setFont(new Font("Arial", Font.PLAIN, 20));
        messageLabel.setForeground(Color.BLUE);
        add(messageLabel, BorderLayout.NORTH);
        add(boardPanel, BorderLayout.CENTER);

        JButton resetButton = new JButton("Reset");
        resetButton.setFont(new Font("Arial", Font.BOLD, 20));
        resetButton.addActionListener(e -> resetGame());
        add(resetButton, BorderLayout.SOUTH);

        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        JButton clickedButton = (JButton) e.getSource();

        if (clickedButton.getText().equals("")) {
            if (playerXTurn) {
                clickedButton.setText("X");
                clickedButton.setForeground(Color.RED);
                messageLabel.setText("Player O's Turn");
            } else {
                clickedButton.setText("O");
                clickedButton.setForeground(Color.GREEN);
                messageLabel.setText("Player X's Turn");
            }
            movesMade++;
            playerXTurn = !playerXTurn;

            if (checkWin()) {
                String winner = playerXTurn ? "O" : "X";
                messageLabel.setText("Player " + winner + " Wins!");
                disableButtons();
            } else if (movesMade == 9) {
                messageLabel.setText("It's a Draw!");
                disableButtons();
            }
        }
    }

    private boolean checkWin() {
        // Check rows
        for (int i = 0; i < 9; i += 3) {
            if (!buttons[i].getText().equals("") &&
                buttons[i].getText().equals(buttons[i + 1].getText()) &&
                buttons[i].getText().equals(buttons[i + 2].getText())) {
                highlightWinningButtons(i, i + 1, i + 2);
                return true;
            }
        }

        // Check columns
        for (int i = 0; i < 3; i++) {
            if (!buttons[i].getText().equals("") &&
                buttons[i].getText().equals(buttons[i + 3].getText()) &&
                buttons[i].getText().equals(buttons[i + 6].getText())) {
                highlightWinningButtons(i, i + 3, i + 6);
                return true;
            }
        }

        // Check diagonals
        if (!buttons[0].getText().equals("") &&
            buttons[0].getText().equals(buttons[4].getText()) &&
            buttons[0].getText().equals(buttons[8].getText())) {
            highlightWinningButtons(0, 4, 8);
            return true;
        }
        if (!buttons[2].getText().equals("") &&
            buttons[2].getText().equals(buttons[4].getText()) &&
            buttons[2].getText().equals(buttons[6].getText())) {
            highlightWinningButtons(2, 4, 6);
            return true;
        }

        return false;
    }

    private void highlightWinningButtons(int b1, int b2, int b3) {
        buttons[b1].setBackground(Color.YELLOW);
        buttons[b2].setBackground(Color.YELLOW);
        buttons[b3].setBackground(Color.YELLOW);
    }

    private void disableButtons() {
        for (JButton button : buttons) {
            button.setEnabled(false);
        }
    }

    private void resetGame() {
        for (JButton button : buttons) {
            button.setText("");
            button.setEnabled(true);
            button.setBackground(Color.WHITE);
        }
        playerXTurn = true;
        movesMade = 0;
        messageLabel.setText("Player X's Turn");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(TicTacToe::new);
    }
}
