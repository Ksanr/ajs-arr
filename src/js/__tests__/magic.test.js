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

  test('чистая атака на дистанцию 1', () => {
    expect(magician.attack).toBe(100);
  });

  test('чистая атака на дистанцию 2', () => {
    magician.distance = 2;
    expect(magician.attack).toBe(90);
  });

  test('чистая атака на дистанцию 3', () => {
    magician.distance = 3;
    expect(magician.attack).toBe(80);
  });

  test('чистая атака на дистанцию 4', () => {
    magician.distance = 4;
    expect(magician.attack).toBe(70);
  });

  test('чистая атака на дистанцию 5', () => {
    magician.distance = 5;
    expect(magician.attack).toBe(60);
  });

  test('атака "под туманом" на дистанцию 2', () => {
    magician.stoned = true;
    magician.distance = 2;
    expect(magician.attack).toBeCloseTo(85);
  });

  test('атака "под туманом" на дистанцию 3', () => {
    magician.stoned = true;
    magician.distance = 3;
    expect(magician.attack).toBeCloseTo(72.075);
  });

  test('атака "под туманом" на дистанцию 4', () => {
    magician.stoned = true;
    magician.distance = 4;
    expect(magician.attack).toBe(60);
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

  test('атака "под туманом" на дистанцию 2', () => {
    daemon.stoned = true;
    daemon.distance = 2;
    expect(daemon.attack).toBeCloseTo(85);
  });
});