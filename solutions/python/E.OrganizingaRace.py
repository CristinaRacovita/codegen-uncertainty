def max_beauty(n, k, w, g):
    gas_prefix = [0] * (n + 1)
    dist_prefix = [0] * (n + 1)
    for i in range(1, n + 1):
        gas_prefix[i] = gas_prefix[i - 1] + g[i - 1]
        if i < n:
            dist_prefix[i] = dist_prefix[i - 1] + w[i - 1]
    max_beauty = 0
    for l in range(1, n + 1):
        r = l
        while r <= n:
            total_gas_needed_forward = dist_prefix[r] - dist_prefix[l - 1] + (gas_prefix[r] - gas_prefix[l - 1])
            total_gas_needed_backward = dist_prefix[n] - dist_prefix[r - 1] + (gas_prefix[n] - gas_prefix[r - 1])
            net_gas_balance = (gas_prefix[r] - gas_prefix[l - 1]) + (gas_prefix[n] - gas_prefix[r - 1])
            total_gas_needed = total_gas_needed_forward + total_gas_needed_backward
            if net_gas_balance >= total_gas_needed:
                max_beauty = max(max_beauty, r - l + 1)
                break
            else:
                additional_gas_needed = total_gas_needed - net_gas_balance
                if additional_gas_needed <= k:
                    max_beauty = max(max_beauty, r - l + 1)
                    k -= additional_gas_needed
                else:
                    break
            r += 1
    return max_beauty
n, k = map(int, input().split())
w = list(map(int, input().split()))
g = list(map(int, input().split()))
print(max_beauty(n, k, w, g))