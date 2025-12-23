---
title: 分布式系统设计笔记
date: 2025-12-20
description: 记录分布式系统设计中的一些关键概念和实践经验。
---

# 分布式系统设计笔记

## CAP 定理

分布式系统无法同时满足以下三个特性：

- **一致性**（Consistency）
- **可用性**（Availability）
- **分区容错性**（Partition Tolerance）

## 常见模式

### 1. 主从复制

```
Master → Slave1
       → Slave2
       → Slave3
```

### 2. 分片

将数据分散到多个节点上，提高吞吐量。

## 总结

分布式系统设计需要在一致性和可用性之间做权衡。
