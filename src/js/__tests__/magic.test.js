import Magician from '../Magician';
import Daemon from '../Daemon';

describe('Magician', () => {
  let magician;

  beforeEach(() => {
    magician = new Magician('Gandalf');
  });

  test('создание мага с базовой атакой 100', () => {
    expect(magician.baseAttack).toBe(100);
    expect(magician.stoned).toBe(false);
    expect(magician.distance).toBe(1);
  });

  test('установка атаки через сеттер', () => {
    magician.attack = 150;
    expect(magician.baseAttack).toBe(150);
    expect(magician.attack).toBe(150);
  });

  // Параметризованные тесты для чистой атаки на разные расстояния
  test.each([
    [1, 100],
    [2, 90],
    [3, 80],
    [4, 70],
    [5, 60],
  ])('чистая атака на дистанцию %i', (distance, expected) => {
    magician.distance = distance;
    expect(magician.attack).toBe(expected);
  });

  // Параметризованные тесты для атаки "под туманом"
  test.each([
    [2, 85],
    [3, 72.075],
    [4, 60],
  ])('атака "под туманом" на дистанцию %i', (distance, expected) => {
    magician.stoned = true;
    magician.distance = distance;
    expect(magician.attack).toBeCloseTo(expected, 2);
  });

  test('линейное уменьшение даёт отрицательное значение (без дурмана)', () => {
    magician.baseAttack = 1;
    magician.distance = 12; // 1 * (1 - 11*0.1) = -0.1 → должно стать 0
    expect(magician.attack).toBe(0);
  });

  test('проверка, что атака не ниже 0 (с дурманом)', () => {
    magician.baseAttack = 10;
    magician.stoned = true;
    magician.distance = 5; // после линейной 6, минус логарифм ~11.6 → отрицательное → 0
    expect(magician.attack).toBe(0);
  });
});

describe('Daemon', () => {
  let daemon;

  beforeEach(() => {
    daemon = new Daemon('Azazel');
  });

  test('создание Демона с базовой атакой 100', () => {
    expect(daemon.baseAttack).toBe(100);
    expect(daemon.stoned).toBe(false);
  });

  test('установка атаки через сеттер', () => {
    daemon.attack = 200;
    expect(daemon.baseAttack).toBe(200);
    expect(daemon.attack).toBe(200);
  });

  // Параметризованный тест для демона
  test.each([
    [2, 85],
    [3, 72.075],
    [4, 60],
  ])('атака "под туманом" на дистанцию %i', (distance, expected) => {
    daemon.stoned = true;
    daemon.distance = distance;
    expect(daemon.attack).toBeCloseTo(expected, 2);
  });
});