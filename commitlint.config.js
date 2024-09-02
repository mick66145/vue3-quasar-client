module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能(feature)
        'fix', // 修補bug
        'docs', // 文檔(documentation)
        'style', // 格式、樣式(不影響代碼運行的變動)
        'refactor', // 重構(即不是新增功能，也不是修改BUG的代碼)
        'perf', // 優化相關，比如提升性能、體驗
        'test', // 添加測試
        'ci', // 持續集成修改
        'chore', // 構建過程或輔助工具的變動
        'revert', // 回到上一個版本
        'workflow', // 工作流改進
        'mod', // 不確定分類的修改
        'wip', // 開發中
        'types', // 類型修改
        'release', // 版本發布,
        'renamed', // 更改資料夾、檔案名稱
      ],
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
}
