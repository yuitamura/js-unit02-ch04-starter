const mainEl = document.getElementById('main');

class Character {
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
    mainEl.innerHTML = `
    <p>キャラクター名：${this.name}</p>
    <p>体力：${this.hp}</p>
    <p>魔法力：${this.mp}</p>
    `
    /* 
      キャラクターの名前、HP、MPを表示する。
    */
  }

  attack(defender) {
    if (this.hp <= 0) {
      mainEl.innerHTML = `${this.name}は死亡しています。攻撃できません。`
      return // 句読点として、このif文は完結
    }
    if (defender.hp <= 0) {
      mainEl.innerHTML = `${defender.name}は死亡しています。攻撃できません。`
      return
    }
    if (this.hp > 0) {
      return this.calcAttackDamage();
    }
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
    */
  }

  calcAttackDamage(defender) {
    const damage = this.offensePower - defender.defencePower;
    if (damage < 0) {
      mainEl.innerHTML = console.log("1");
    } else {
      mainEl.innerHTML = damage;
    }
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
  }
}

class Sorcerer extends Character {
  constructor() {
    
  }

  healSpell(target) {
    /* 
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
  }

  fireSpell(target) {
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