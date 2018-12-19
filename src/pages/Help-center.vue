<template>
  <div class="help">
    <ul>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">支持抵押的币种？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">有币贷平台目前支持BTC/ETH/ETC/LTC/GTC</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">目前能抵押贷款的天数？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">有币贷平台目前支持最低借款天数为7天，最长借款天数为30天</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">目前能抵押贷款的额度？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">有币贷平台对于每个支持抵押贷款的币种有一个每日的平台总额度，如果当日有剩余额度，即可申请借款。
            每个用户最低申请借款额度为1万，最高申请借款额度为100万。
          </div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">抵押贷款有手续费吗？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">有币贷平台目前的抵押贷款手续费为每日0.25%</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">如何计算贷款金额？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">贷款金额=抵押的货币数量*抵押时的价格*质押率</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">平台的质押率是多少？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">由于不同数字货币风险不同，所以不同数字货币的质押率不同，目前有币贷平台对于BTC /ETH /ETC/LTC的质押率</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">实际到账金额为什么比贷款金额少？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">
            实际到账金额=贷款金额-手续费
            <br>
            手续费=贷款金额*借款天数*0.25%
          </div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">什么是警戒线？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">警戒线是指当抵押的虚拟货币价格跌至抵押时候价格的75%时候，系统会触发补充保证金的一个警戒线值，当触发该值，
            系统会通知你缴纳保证金，以免被平仓。
            <br>
            警戒线=抵押时的价格*抵押时的数量*0.75
          </div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">什么是平仓线？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">平仓线是指当警戒线是指当抵押的虚拟货币价格跌至抵押时候价格的50%时候，如果你没有及时缴纳保证金，
            那么系统会触发平仓，即你抵押的虚拟货币会归有币贷平台所有。
            <br>
            平仓线=抵押时的价格*抵押时的数量*0.5
          </div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">保证金的计算方式</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">保证金=借款金额*20%</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">如何保证我抵押的数字资产安全?</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">抵押数字货币的地址公开可查，多重离线冷钱包保证安全</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">退币地址为什么需要跟充币地址一样，不能更改？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">为了确保你的资产安全，充币后需要绑定充币进来的地址，方便平台审核，也方便之后的退币操作。</div>
        </div>
      </li>
      <li>
        <div class="question">
          <div class="letter-q">Q</div>
          <div class="que">如何退币？</div>
        </div>
        <div class="answer">
          <div class="letter-a">A</div>
          <div class="ans">当借款到期或者你想提前申请退币的话，你可以先还款到指定银行卡账户，
            我们会在确认收到款后的1个工作日内打回到你之前绑定的退币地址
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    name: "Help-center"
  }
</script>

<style scoped>
  .help {
    background: #F5F6FA;
    overflow: hidden;
    box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  }

  ul > li {
    width: 1200px;
    overflow: auto;
    background: #ffffff;
    margin: 20px auto 0 auto;
    border:1px solid rgba(235, 235, 235, 1);
  }
  ul > li:nth-child(1){
    margin-top: 40px;
  }

  ul>li:nth-last-child(1){
    margin-bottom: 100px;
  }

  .question, .answer {
    display: flex;
    flex-direction: row;
    align-items: first;
    margin-left: 60px;
  }

  .question {
    margin-top: 41px;
  }

  .answer {
    margin-top: 21px;
    margin-bottom: 40px;
  }

  .letter-q, .letter-a {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .letter-q {
    background: #FF8A14;
    box-shadow: 0px 2px 10px 0px rgba(255,138,20,0.57);
    border-radius:3px;
  }

  .letter-a {
    background: #4753F5;
    box-shadow: 0px 2px 10px 0px rgba(71,83,245,0.57);
    border-radius:3px;
  }

  .que {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-left: 20px;
  }

  .ans {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-left: 21px;
    width: 1010px;
    line-height: 28px;
  }
</style>
