module.exports = {
  styles: `<style>
      #github-stats-card * {box-sizing: border-box;}
      #github-stats-card {max-width: 320px; margin: 0; width: 100%; padding: 0; background-color: #fff; box-sizing: border-box; font-family: Arial, sans-serif;  display: flex; border: 1px solid #efefef; flex-direction: column; flex-basis: 100%; font-size: 12px;}
      
      #github-stats-card header h3 {display: flex; justify-content: center; align-items: center;}
      #github-stats-card header h3 img,
      #github-stats-card header h3 a { display: flex; flex-direction: column; }
      #github-stats-card header h3 a { display: inline-block; text-decoration: none; color: #212121; max-width: calc(100% - 30px); }
      #github-stats-card header img { width: 20px; margin-left: 10px; }
      
      #github-stats-card .subheader { display: flex; justify-content: center; max-width: 100%; padding: 10px 15px; background-color: #efefef;}
      #github-stats-card ol, ul {max-width: 100%; display: flex; flex-direction: column; align-items: center; margin: 0; padding: 0 0 10px 10px;}
      #github-stats-card li { margin: 5px 0; }
      #github-stats-card li small { display: block; }
      #github-stats-card p {width: 100%; text-align: center;}
      #github-stats-card .top {display: flex; width: 100%; flex-direction: row; padding-bottom: 10px; border-bottom: 1px solid #efefef; margin-bottom: 10px; text-align: center; justify-content: space-around;}
      
      #github-stats-card .bottom { list-style: none; }
      
      #github-stats-card .content {display: flex; justify-content: center; flex-wrap: wrap; padding: 15px; }

      #github-stats-card .content,
      #github-stats-card .top,
      #github-stats-card .bottom,
      #github-stats-card header { max-width: 100%; }
    </style>`
}