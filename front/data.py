import json
import random

# Generate 50 rows of random data
rows = []
clusters = ["Cluster A", "Cluster B", "Cluster C", "Cluster D"]

for _ in range(50):
    row = {
        "计算池ID": random.randint(1, 100),
        "vCPU": random.choice([2, 4, 6, 8]),
        "内存": random.choice(["4GB", "8GB", "12GB", "16GB"]),
        "空闲CPU": random.randint(1, 8),
        "空闲内存": random.choice(["2GB", "4GB", "6GB", "8GB", "10GB", "12GB"]),
        "处理器性能": random.choice(["Low", "Medium", "High"]),
        "数据源": f"Source {random.choice(['A', 'B', 'C', 'D', 'E'])}",
        "所属集群": random.choice(clusters),
        "参考价格": f"${random.randint(50, 200)}"
    }
    rows.append(row)

sample_data_random = {
    "rows": rows
}

# Save to JSON file
with open("sample_data_random.json", "w", encoding="utf-8") as f:
    json.dump(sample_data_random, f, ensure_ascii=False, indent=4)
