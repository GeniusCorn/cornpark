# TCP 连接

## 三次握手

1. 第一次握手：建立连接。客户端发送连接请求报文段，将 SYN 位置为 1，Sequence Number 为 x；然后，客户端进入 SYN_SEND 状态，等待服务器确认。
2. 第二次握手：服务器收到 SYN 报文段，需要对这个 SYN 报文段进行确认，设置 Acknowledgment Number 为 x + 1（Sequence Number + 1）；同时，自己还要发送 SYN 请求信息，将 SYN 位置为 1，Sequence Number 为 y；服务器端将上述所有信息放到一个报文段（SYN + ACK 报文段中），一并发给客户端，此时服务器进入 SYN_RECV 状态。
3. 第三次握手：客户端收到服务器的 SNY + ACK 报文段，将 Acknowledgement Number 置为 y + 1，向服务器发送 ACK 报文段。发送完毕后，客户端和服务器都进入 ESTABLISHED 状态。

## 四次挥手

1. 第一次挥手：主机 1（可以是客户端也可以是服务端）设置 Sequence Number 和 Acknowledgment Number，向主机 2 发送一个 FIN 报文段；主机 1 进入 FIN_WAIT_1 状态，表示主机 1 没有数据要发送给主机 2。
2. 第二次挥手：主机 2 收到了主机 1 发送的 FIN 报文段，向主机 1 回一个 ACK 报文段，Acknowledgement Number 为 Sequence Number + 1；主机 1 进入 FIN_WAIT_2 状态；主机 2 告诉主机 1 同意关闭请求。
3. 第三次挥手：主机 2 向主机 1 发送 FIN 报文段，请求关闭连接，同时主机 2 进入 LAST_ACK 状态。
4. 第四次挥手：主机 1 收到主机 2 发送的 FIN 报文段，向主机 2 发送 ACK 报文段，主机 1 进入 TIME_WAIT 状态；主机 2 收到主机 1 的 ACK 报文段后就关闭连接；此时，主机 1 等待 2MSL 后依然没有收到回复，则证明服务端正常关闭。主机 1 也可以关闭连接。