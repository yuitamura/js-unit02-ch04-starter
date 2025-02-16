class Character { // どのキャラにも当てはまる
  constructor(props) {
    this.name = props.name // 大文字だとクラス名に見える
    this.hp = props.hp
    this.mp = props.mp
    this.offensePower = props.offensePower
    this.defencePower = props.defencePower
  }

  showStatus() {
    const mainEl = document.getElementById('main');
    const div = document.createElement('div'); // DOMとわかる名前
    div.innerHTML = `
    キャラクター名：${this.name}<br>
    体力：${this.hp}<br>
    魔法力：${this.mp}<br><br>
    `
    mainEl.appendChild(div);
    /* 
      キャラクターの名前、HP、MPを表示する。
    */
  }

  attack(defender) {
    const mainEl = document.getElementById('main');
    const div = document.createElement('div');
    const attackDamage = this.calcAttackDamage(defender); // thisも含められる、関連のあるところにまとめる
    defender.hp = defender.hp - attackDamage;
    if (defender.hp <= 0) {
      div.innerHTML = `
      ${this.name}が${defender.name}に${attackDamage}のダメージを与えました。
      ${defender.name}は死亡しています。攻撃できません。 
      `
    } else {
      div.innerHTML = `
      ${this.name}が${defender.name}に${attackDamage}のダメージを与えました。
      `
    }
    mainEl.appendChild(div); // 1行にまとめる
    // 区切りの改行
    if (this.hp <= 0) {
      div.innerHTML = `${this.name}は死亡しています。攻撃できません。`
      mainEl.appendChild(div);
      return // 句読点として、このif文は完結
    }
    if (defender.hp <= 0) {
      div.innerHTML = `
      ${defender.name}は死亡しています。攻撃できません。
      `
      mainEl.appendChild(div);
      return
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
      damage = 1; // 代入しただけ、計算はしていない
    } else {
      return damage; // 省略できるが、ロジックを理解するために書く
    }
    return damage;
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    const mainEl = document.getElementById('main');
    const div = document.createElement('div');
    if (target.hp <= 0) {
      div.innerHTML = `
      ${target.name}は死亡しています。回復魔法は使えません。
      `
    } else {
      target.hp = target.hp + 15;
      div.innerHTML = `
      ${target.name}の体力が15回復しました。
      `
      mainEl.appendChild(div);
    }

    if (target.mp > 3) {
      target.mp = target.mp - 3;
      div.innerHTML = `
      ${target.name}の魔法力を3消費しました。
      `
    } else {
      div.innerHTML = `
      ${target.name}の魔法力が不足しています。回復魔法は使えません。
      `
      mainEl.appendChild(div);
    }
    if (target.hp <= 0) {
      div.innerHTML = `
      ${target.name}は死亡しています。回復魔法は使えません。
      `
      mainEl.appendChild(div);
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
    const mainEl = document.getElementById('main');
    const div = document.createElement('div');
    if (target.hp <= 0) {
      div.innerHTML = `
      ${target.name}は死亡しています。攻撃魔法は使えません。
      `
    } else {
      target.hp = target.hp - 10;
      div.innerHTML = `
      ${target.name}に10のダメージを与えました。
      `
      mainEl.appendChild(div);
    }

    if (target.mp > 2) {
      target.mp = target.mp - 2;
      div.innerHTML = `
      ${target.name}の魔法力を2消費しました。
      `
    } else {
      div.innerHTML = `
      ${target.name}の魔法力が不足しています。回復魔法は使えません。
      `
      mainEl.appendChild(div);
    }
    if (target.hp <= 0) {
      div.innerHTML = `
      ${target.name}は死亡しています。回復魔法は使えません。
      `
      mainEl.appendChild(div);
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