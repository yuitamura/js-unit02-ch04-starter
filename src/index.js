const mainEl = document.getElementById('main');

class Character { // どのキャラにも当てはまる
  constructor(props) {
    this.name = props.name // 大文字だとクラス名に見える
    this.hp = props.hp
    this.initialHP = props.initialHP
    this.mp = props.mp
    this.initialMP = props.initialMP
    this.offensePower = props.offensePower
    this.defencePower = props.defencePower
  }

  showStatus() {
    const status = document.createElement('p');
    status.innerHTML = `
    <p>キャラクター名：${this.name}</p>
    <p>体力：${this.hp}</p>
    <p>魔法力：${this.mp}</p>
    `

    mainEl.appendChild(status);
    /* 
      キャラクターの名前、HP、MPを表示する。
    */
  }

  attack(defender) {
    const attackDamage = this.calcAttackDamage(defender); // thisも含められる
    defender.hp = defender.hp - attackDamage;

    if (this.hp <= 0) {
      mainEl.innerHTML = `${this.name}は死亡しています。攻撃できません。`
      return // 句読点として、このif文は完結
    }
    if (defender.hp <= 0) {
      mainEl.innerHTML = `
      ${this.name}が${defender.name}に${attackDamage}のダメージを与えました。
      ${defender.name}は死亡しています。攻撃できません。
      `
    } else {
      mainEl.innerHTML = `${this.name}が${defender.name}に${attackDamage}のダメージを与えました。`
    }
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
    */
  }

  calcAttackDamage(defender) {
    let damage = this.offensePower - defender.defencePower;
    if (damage <= 0) {
      damage = 1;
    } else {
      return damage;
    }
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
  }
}

class Sorcerer extends Character {
  constructor() {
    super();
  }

  healSpell(target) {
    if (target.hp <= 0) {
      mainEl.innerHTML = `
      ${target.name}は死亡しています。回復魔法は使えません。
      `
    } else {
      target.hp = target.hp + 15;
    }

    if (sourcerer.mp > 3) {
      sourcerer.mp = sourcerer.mp - 3;
    } else {
      mainEl.innerHTML = `
      ${sourcerer.name}のMPが不足しています。回復魔法は使えません。
      `
    }
    if (sourcerer.hp <= 0) {
      mainEl.innerHTML = `
      ${sourcerer.name}は死亡しています。回復魔法は使えません。
      `
      return
    }
    /* 
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
  }

  fireSpell(target) {
    if (target.hp <= 0) {
      mainEl.innerHTML = `
      ${target.name}は死亡しています。攻撃魔法は使えません。
      `
    } else {
      target.hp = target.hp - 10;
    }

    if (sourcerer.mp > 2) {
      sourcerer.mp = sourcerer.mp - 2;
    } else {
      mainEl.innerHTML = `
      ${sourcerer.name}のMPが不足しています。回復魔法は使えません。
      `
    }
    if (sourcerer.hp <= 0) {
      mainEl.innerHTML = `
      ${sourcerer.name}は死亡しています。回復魔法は使えません。
      `
      return
    }
    /* 
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
  }
}

{
  const fighter = new Character({
    name: '武道家',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}