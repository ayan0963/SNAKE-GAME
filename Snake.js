import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.LinkedList;
import java.util.Random;

public class SnakeGame extends JPanel implements ActionListener, KeyListener {
    final int TILE_SIZE = 25;
    final int WIDTH = 20;
    final int HEIGHT = 20;
    final int SCREEN_WIDTH = TILE_SIZE * WIDTH;
    final int SCREEN_HEIGHT = TILE_SIZE * HEIGHT;

    LinkedList<Point> snake;
    Point food;
    int dx = 1, dy = 0;
    boolean running = true;
    Timer timer;
    int score = 0;

    public SnakeGame() {
        setPreferredSize(new Dimension(SCREEN_WIDTH, SCREEN_HEIGHT));
        setBackground(Color.BLACK);
        setFocusable(true);
        addKeyListener(this);
        initGame();
    }

    void initGame() {
        snake = new LinkedList<>();
        snake.add(new Point(WIDTH / 2, HEIGHT / 2));
        placeFood();
        timer = new Timer(100, this); // controls speed
        timer.start();
    }

    void placeFood() {
        Random rand = new Random();
        int x, y;
        do {
            x = rand.nextInt(WIDTH);
            y = rand.nextInt(HEIGHT);
            food = new Point(x, y);
        } while (snake.contains(food));
    }

    public void actionPerformed(ActionEvent e) {
        if (!running) return;

        Point head = snake.getFirst();
        Point newHead = new Point(head.x + dx, head.y + dy);

        // Check for wall or self collision
        if (newHead.x < 0 || newHead.x >= WIDTH || newHead.y < 0 || newHead.y >= HEIGHT || snake.contains(newHead)) {
            running = false;
            timer.stop();
            repaint();
            return;
        }

        snake.addFirst(newHead);

        if (newHead.equals(food)) {
            score++;
            placeFood();
        } else {
            snake.removeLast();
        }

        repaint();
    }

    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (!running) {
            g.setColor(Color.RED);
            g.setFont(new Font("Arial", Font.BOLD, 32));
            g.drawString("Game Over!", SCREEN_WIDTH / 2 - 100, SCREEN_HEIGHT / 2);
            g.setFont(new Font("Arial", Font.PLAIN, 18));