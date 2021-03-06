module.exports = {
  styles: `<style>
      .github-stats-card * {box-sizing: border-box;}
      .github-stats-card {max-width: 350px; margin: auto; width: 100%; padding: 0; background-color: #fff; box-sizing: border-box; font-family: Arial, sans-serif;  display: flex; border: 1px solid #e9e9e9; flex-direction: column; flex-basis: 100%; font-size: 12px; line-height: 16px; box-shadow: 5px 10px 20px -10px rgba(0,0,0,.2);}

      .github-stats-card h3 {display: flex; justify-content: center; align-items: center;box-sizing: border-box; margin: 0; padding: 20px 0; font-size: 18px;  font-weight: 400;}

      .github-stats-card h3 a { display: inline-block; text-decoration: none; color: inherit; max-width: calc(100% - 30px); box-sizing: border-box; line-height: 24px; font-size: 18px; font-weight: 600; color: #4078c0; }
      .github-stats-card h3 img { display: flex; flex-direction: column; box-sizing: border-box; width: 20px;  margin-left: 10px;}

      .github-stats-card h4 { display: flex; justify-content: center; max-width: 100%; padding: 10px 0; margin: 0; font-weight: normal;font-style: italic; font-size: 12px; line-height: 16px; background-color: #f5f5f5;}
      .github-stats-card h5 {display: flex; background-color: #4078c0; color: #fff; justify-content: center; font-weight: 400;  padding: 10px 0; margin: 0;box-sizing: border-box; font-size: 13px; }

      .github-stats-card h5 span {display: flex; flex-direction: row; flex-wrap: nowrap; margin: 0 5px; box-sizing: border-box; font-size: 13px; line-height: 18px; vertical-align: middle;}
      .github-stats-card h5 span b { margin-right: 3px; font-size: 16px;}
      .github-stats-card ol, ul {max-width: 100%; display: flex; flex-direction: column; align-items: center; margin: 0; padding: 0 0 10px 10px;}
      .github-stats-card ol {list-style: none; display: flex; width: 100%; flex-direction: row; padding-bottom: 10px; border-bottom: 1px solid #f5f5f5; margin-bottom: 10px; text-align: center; justify-content: space-around;}

      .github-stats-card ol li:first-of-type { order: 2; }
      .github-stats-card ol li:nth-of-type(2) { order: 1; }
      .github-stats-card ol li:last-of-type { order: 3; }
      .github-stats-card ul { list-style: none; }
      .github-stats-card ul li b { font-size : 13px; font-family: Menlo, Monaco, monospace; }
      .github-stats-card li { margin: 5px 0; }
      .github-stats-card li small { display: block;font-size: 12px; }
      .github-stats-card li b { font-size: 13px; }
      .github-stats-card p {width: 100%; text-align: center; margin: 5px auto;}
      .github-stats-card div {display: flex; justify-content: center; flex-wrap: wrap; padding: 10px 15px; }
      .github-stats-card.error h1 {position: absolute; color: #d80404;}
      .github-stats-card.error ul {width: 100%; text-align: center; min-height: 231px; position: relative;}
      .github-stats-card.error ul li {font-size: 18px; line-height: 22px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; font-weight: 400;}
      .github-stats-card div p {  font-weight: 400; font-size: 14px; }
      .github-stats-card div p b { font-weight: 400; font-size: 15px; }
      .github-stats-card footer {display: flex; align-items: center; height: 100px; max-width: 100%; box-sizing: border-box; background-color: #f5f5f5;}
      .github-stats-card.error footer p { text-align: left; font-size: 14px; line-height: 18px;}
      .github-stats-card.error footer p b { text-transform: none; }

      .github-stats-card footer img {max-width: 100px; box-sizing: border-box; display:block;}
      .github-stats-card footer section {display: flex; justify-content: flex-start; flex-wrap: wrap; padding: 10px 15px;}
      .github-stats-card footer section p { margin: 0; padding-bottom: 2.5px; font-size: 11px; line-height: 14px; }
      .github-stats-card footer section p b { text-transform: uppercase;}
      .github-stats-card footer a { color: #4078c0; text-decoration:none; font-weight: 600;}
    </style>`
}