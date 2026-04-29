import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-call-center',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-rose-400 pr-3">مركز الاتصال وخدمة العملاء</h2>
        <div class="flex gap-2">
           <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-black border border-emerald-100">
             <span class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
             4 مكالمات نشطة حالياً
           </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="xl:col-span-2 space-y-4">
          <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
             <h3 class="text-sm font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tight">
               <lucide-icon name="phone-incoming" [size]="18" class="text-sky-500"></lucide-icon>
               تسجيل طلب وارد سريع
             </h3>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-[11px] font-black text-slate-400 uppercase">اسم المتصل / المريض</label>
                  <input type="text" placeholder="أدخل الاسم..." class="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-sky-500">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[11px] font-black text-slate-400 uppercase">رقم الهاتف</label>
                  <input type="text" placeholder="01xxxxxxxxx" class="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-sky-500">
                </div>
                <div class="col-span-2 space-y-1.5">
                  <label class="text-[11px] font-black text-slate-400 uppercase">نوع الطلب / الاستفسار</label>
                  <select class="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-sky-500 font-bold">
                    <option>استعلام عن نتائج</option>
                    <option>حجز زيارة منزلية</option>
                    <option>استفسار عن أسعار تحاليل</option>
                    <option>شكوى / اقتراح</option>
                  </select>
                </div>
                <div class="col-span-2 pt-2">
                   <button class="w-full bg-sky-600 hover:bg-sky-700 text-white font-black py-2.5 rounded shadow-lg shadow-sky-100 transition-all active:scale-95 text-sm uppercase tracking-wider">حفظ الطلب وتوزيع المهام</button>
                </div>
             </div>
          </div>
          
          <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-700">سجل المكالمات الأخير</h3>
              <button class="text-[11px] font-bold text-slate-400 hover:text-sky-600">تحديث السجل</button>
            </div>
            <table class="w-full text-right border-collapse text-[13px]">
              <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th class="px-4 py-3 font-bold">التوقيت</th>
                  <th class="px-4 py-3 font-bold">اسم المتصل</th>
                  <th class="px-4 py-3 font-bold">نوع المكالمة</th>
                  <th class="px-4 py-3 font-bold">الحالة</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr *ngFor="let call of calls()" class="hover:bg-slate-50/50 transition-colors">
                  <td class="px-4 py-3 font-mono font-bold text-slate-400 text-xs">{{ call.time }}</td>
                  <td class="px-4 py-3 font-bold text-slate-800">{{ call.name }}</td>
                  <td class="px-4 py-3 text-slate-600 font-medium">{{ call.type }}</td>
                  <td class="px-4 py-3">
                    <span 
                      class="px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase inline-block border"
                      [ngClass]="{
                        'bg-emerald-50 text-emerald-700 border-emerald-100': call.status === 'Resolved',
                        'bg-amber-50 text-amber-700 border-amber-100': call.status === 'Pending'
                      }"
                    >
                      {{ call.status === 'Resolved' ? 'تم الرد والحفظ' : 'جاري المتابعة' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="space-y-4">
          <div class="stat-card">
            <p class="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-3">تقييم الخدمة اليوم</p>
            <div class="flex items-center gap-4">
               <h3 class="text-3xl font-black text-slate-900">4.8</h3>
               <div class="flex flex-col">
                 <div class="flex text-amber-400"><lucide-icon name="star" [size]="14"></lucide-icon><lucide-icon name="star" [size]="14"></lucide-icon><lucide-icon name="star" [size]="14"></lucide-icon><lucide-icon name="star" [size]="14"></lucide-icon><lucide-icon name="star" [size]="14"></lucide-icon></div>
                 <span class="text-[10px] text-slate-400 font-bold mt-1">بناءً على 42 تقييم</span>
               </div>
            </div>
          </div>

          <div class="bg-indigo-900 text-white rounded-lg p-6 shadow-xl relative overflow-hidden group">
            <lucide-icon name="phone-outgoing" [size]="60" class="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-125 transition-transform duration-700"></lucide-icon>
            <h4 class="text-sm font-black mb-2 flex items-center gap-2">
              <span class="w-2 h-2 bg-rose-500 rounded-full"></span>
              مكالمات لم يتم الرد عليها
            </h4>
            <p class="text-2xl font-black mb-4">02</p>
            <button class="w-full py-2 bg-indigo-800 hover:bg-indigo-700 rounded text-[11px] font-bold border border-indigo-700 transition-all uppercase tracking-widest">إظهار القائمة للاتصال</button>
          </div>

          <div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
             <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">الأسعار الأكثر طلباً اليوم</h3>
             <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-slate-700">CBC (Complete Blood)</span>
                  <span class="font-bold text-sky-600">150 EGP</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-slate-700">Liver Profile (Full)</span>
                  <span class="font-bold text-sky-600">450 EGP</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-slate-700">Vitamin D (Roche)</span>
                  <span class="font-bold text-sky-600">850 EGP</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CallCenterComponent {
  calls = signal([
    { time: '12:30 PM', name: 'أحمد محمود جلال', type: 'نتائج (واتساب)', status: 'Resolved' },
    { time: '12:45 PM', name: 'سارة خالد الأنصاري', type: 'زيارة منزلية', status: 'Pending' },
    { time: '01:05 PM', name: 'ياسين منصور هلال', type: 'استفسار أسعار', status: 'Resolved' },
    { time: '01:15 PM', name: 'مجهول', type: 'لم يتم الرد', status: 'Pending' },
  ]);
}

