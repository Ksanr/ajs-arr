export default class Character {
  constructor(name, type, baseAttack) {
    this.name = name;
    this.type = type;
    this.baseAttack = baseAttack;
    this._stoned = false;
    this.distance = 1; // расстояние до цели по умолчанию
  }

  set stoned(value) {
    this._stoned = value;
  }

  get stoned() {
    return this._stoned;
  }

  set attack(value) {
    // Если устанавливают базовую атаку (например, при создании)
    this.baseAttack = value;
  }

  get attack() {
    // Линейное уменьшение атаки в зависимости от расстояния
    let attackPower = this.baseAttack * (1 - (this.distance - 1) * 0.1);
    if (attackPower < 0) attackPower = 0; // минимальное значение 0

    // Если есть дурман, дополнительно уменьшаем
    if (this._stoned) {
      attackPower -= Math.log2(this.distance) * 5;
    }
    // Округляем до целого
    return Math.max(0, attackPower);
  }
}