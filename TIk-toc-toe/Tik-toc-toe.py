board = [' ' for _ in range(9)] # Initialize the game board

def print_board():
    row1 = '| {} | {} | {} |'.format(board[0], board[1], board[2])
    row2 = '| {} | {} | {} |'.format(board[3], board[4], board[5])
    row3 = '| {} | {} | {} |'.format(board[6], board[7], board[8])

    print()
    print(row1)
    print(row2)
    print(row3)
    print()

def has_won(player):
    win_conditions = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]
    for condition in win_conditions:
        if board[condition[0]] == board[condition[1]] == board[condition[2]] == player:
            return True
    return False

def is_draw():
    return ' ' not in board

def main():
    current_player = 'X'
    while True:
        print_board()
        move = input("Player {}, enter your move (1-9): ".format(current_player))
        try:
            move = int(move) - 1
            if move < 0 or move > 8:
                print("Please enter a number between 1 and 9.")
                continue
        except ValueError:
            print("Invalid input. Please enter a number.")
            continue
        
        if board[move] != ' ':
            print("Invalid move, the spot is already taken. Try again.")
            continue
        
        board[move] = current_player
        if has_won(current_player):
            print_board()
            print("Player {} wins! Congratulations!".format(current_player))
            break
        elif is_draw():
            print_board()
            print("It's a draw!")
            break
        
        current_player = 'O' if current_player == 'X' else 'X'

if __name__ == '__main__':
    main()
