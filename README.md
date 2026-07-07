# 🎮 Tic-Tac-Toe Suite (Desktop & Mobile)

Welcome to the **Tic-Tac-Toe Suite**! This repository is a multi-platform codebase containing two distinct implementations of the classic Tic-Tac-Toe game: a modern, feature-rich **React Native / Expo Mobile Application** (with CPU AI, neomorphic UI, and backend boilerplate), and a lightweight **Java Swing Desktop Application**. A pre-compiled Android APK is also included for immediate play.

---

## 📂 Repository Structure

The repository is organized as follows:

```text
├── tic-tac-toe-mobile/            # Expo / React Native Mobile Application & Backend
│   ├── app/                       # Expo Router application screens (tab-navigation, game layout)
│   ├── components/                # Reusable UI components (SafeArea wrappers, themed elements)
│   ├── hooks/                     # Custom React hooks (theme colors, authentication state)
│   ├── server/                    # Node.js backend (Express + tRPC + Drizzle ORM + MySQL)
│   ├── design.md                  # Mobile App Design System specifications
│   ├── todo.md                    # Checklist of completed and pending mobile tasks
│   └── package.json               # Mobile & Backend dependencies and scripts
│
├── TicTacToe.java                 # Standalone Java Swing Desktop Application
├── tic-tac-toe-mobile-v1_0_0.apk  # Pre-compiled Android application package
└── README.md                      # Project documentation (this file)
```

---

## 📱 Mobile App: React Native & Expo (`tic-tac-toe-mobile`)

The mobile app is a premium-feeling, modern Tic-Tac-Toe game designed for portrait mobile screens.

### Key Features
*   **Neomorphic Design**: Tactics-oriented dark slate/navy theme (`#1A2B33`) with subtle 3D shadows (`#10212A`) and responsive press feedback to give tiles a tactile, physical feel.
*   **Smart CPU AI Opponent**:
    1.  **Win Tactic**: Automatically scans for and takes the winning tile.
    2.  **Block Tactic**: Identifies if the player is one move away from winning and blocks them.
    3.  **Strategic Positioning**: Prefers the center tile (`4`) or corners (`0`, `2`, `6`, `8`) if open.
    4.  **Simulated Thinking**: Includes a realistic `500ms` delay before taking action.
*   **Interactive Header**: Houses the dual-colored brand logo (Cyan **X** & Orange **O**), a pill-shaped status indicator ("X TURN", "O TURN", "YOU WIN", "CPU WINS"), and a reset button.
*   **Persistent Scoreboard**: Tracks player wins, CPU wins, and ties across multiple games.
*   **Haptic Feedback**: Integrated haptics (`expo-haptics`) trigger when the player taps a tile to elevate user engagement.
*   **Full-Stack Boilerplate**: Features a backend directory configured with Express, tRPC client/server, and Drizzle ORM (MySQL2) with user session management.

### Tech Stack
*   **Core**: React 19, React Native (Expo SDK 54), TypeScript 5.9
*   **Styling**: NativeWind v4 (Tailwind CSS v3)
*   **Navigation**: Expo Router v6 (using file-based routing)
*   **State Management**: TanStack React Query (v5) & React Context API
*   **Backend & DB**: Node.js, Express, tRPC (v11), Drizzle ORM, MySQL2, Jose (JWT auth)

### Mobile Getting Started
To run the mobile app locally:

1.  Navigate to the directory:
    ```bash
    cd tic-tac-toe-mobile
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server (runs both API backend and Metro packager):
    ```bash
    pnpm dev
    ```
4.  Launch the app:
    *   Press `a` to run on an Android emulator/device.
    *   Press `i` to run on an iOS simulator.
    *   Press `w` to open in a web browser.

---

## 🤖 Pre-Compiled Android App (`tic-tac-toe-mobile-v1_0_0.apk`)

For convenience, a production-ready Android package is included directly in the root folder.
*   **File**: [tic-tac-toe-mobile-v1_0_0.apk](file:///d:/My%20All%20Projects/Tic-Tac-Toe%20Android%20App/tic-tac-toe-mobile-v1_0_0.apk)
*   **How to Play**: Transfer this file to your Android phone, enable "Install from Unknown Sources" in your device settings, and install it to play the game on the go.

---

## 💻 Desktop App: Java Swing (`TicTacToe.java`)

A lightweight, local two-player implementation written in vanilla Java. It uses the `JFrame` windowing system for easy running on any computer with a JVM.

### Key Features
*   **Classic UI**: Clean white layout with an interactive 3x3 grid of buttons.
*   **Turn & Win Detection**: Instantly evaluates board conditions and alerts players.
*   **Winning Highlight**: Highlights the three winning buttons in yellow when a row, column, or diagonal matches.
*   **State Control**: Automatically disables the grid upon game completion (win or draw) and includes a "Reset" button to start a new match.

### Desktop Getting Started
To compile and run the desktop game:

1.  Compile the source code:
    ```bash
    javac TicTacToe.java
    ```
2.  Run the application:
    ```bash
    java TicTacToe
    ```

---

## 🛠️ Requirements & Tooling

To work with all parts of this project, you will need:
*   **Java Development Kit (JDK)**: Version 8 or higher to compile `TicTacToe.java`.
*   **Node.js**: Version 18+ to run the React Native development server.
*   **PNPM**: Recommended package manager for the mobile workspace.
*   **Expo Go** app (optional): Installed on your phone to run the development build without building native code manually.
