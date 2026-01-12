import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function ExchangeRateBadge() {
  const [rate, setRate] = useState<number>(282)

  useEffect(() => {
    // Fetch initial rate
    async function fetchRate() {
      const { data } = await supabase
        .from('global_settings')
        .select('value')
        .eq('key', 'exchange_rate')
        .single()

      if (data?.value) {
        setRate((data.value as { usd_to_bs: number }).usd_to_bs)
      }
    }

    fetchRate()

    // Subscribe to real-time updates
    const channel = supabase
      .channel('exchange_rate_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'global_settings',
          filter: 'key=eq.exchange_rate',
        },
        (payload) => {
          const newRate = (payload.new as { value: { usd_to_bs: number } }).value.usd_to_bs
          setRate(newRate)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Tasa del dolar:</span>
      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        Bs.{rate}
      </span>
    </div>
  )
}
