# 安装 fish shell 和 tmux

## 指定系统 shell

使用 `cat /etc/shells` 查看已安装 shell。

```shell
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/fish
```

我们希望 ssh 时可以直接进入 tmux，那么就需要更改默认 shell。

使用 `chsh` 命令更改默认登录 shell，在 `Login Shell` 处输入对应的 `/usr/bin/tmux`。

## 指定 tmux 默认 shell

在根目录下新建 `tmux` 配置文件 `.tmux.conf`，并写入：

```txt
set -g default-shell "/usr/bin/fish"
```
