import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home-visit',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-amber-400 pr-3">إدارة الزيارات المنزلية</h2>
        <button class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2">
          <lucide-icon name="map-pin" [size]="16"></lucide-icon>
          حجز زيارة جديدة
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
          <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-700">جدول الزيارات لليوم</h3>
              <div class="flex gap-2">
                <button class="text-xs font-bold text-sky-600 hover:underline">المتأخرة (1)</button>
              </div>
            </div>

            <table class="w-full text-right border-collapse text-[13px]">
              <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th class="px-4 py-3 font-bold">الموعد</th>
                  <th class="px-4 py-3 font-bold">المريض</th>
                  <th class="px-4 py-3 font-bold">المنطقة</th>
                  <th class="px-4 py-3 font-bold">المندوب</th>
                  <th class="px-4 py-3 font-bold text-center">الحالة</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr *ngFor="let visit of visits()" class="hover:bg-slate-50/50 transition-colors">
                  <td class="px-4 py-3 font-bold text-slate-900 text-xs">{{ visit.time }}</td>
                  <td class="px-4 py-3 font-bold text-slate-800">{{ visit.patient }}</td>
                  <td class="px-4 py-3 text-slate-600 font-medium">{{ visit.area }}</td>
                  <td class="px-4 py-3 text-slate-600">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">م</div>
                      {{ visit.technician }}
                    </div>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span 
                      class="px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase inline-block"
                      [ngClass]="{
                        'bg-emerald-100 text-emerald-700': visit.status === 'مكتمل',
                        'bg-amber-100 text-amber-700': visit.status === 'قيد التنفيذ',
                        'bg-blue-100 text-blue-700': visit.status === 'في الطريق'
                      }"
                    >
                      {{ visit.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <lucide-icon name="navigation" [size]="18" class="text-amber-500"></lucide-icon>
              المندوبين المتاحين للطلب
            </h3>
            <div class="space-y-4">
              <div *ngFor="let tech of techGroup()" class="flex items-center justify-between p-2 hover:bg-slate-50 rounded transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <lucide-icon name="user" [size]="18"></lucide-icon>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-800">{{ tech.name }}</p>
                    <p class="text-[10px] text-emerald-600 font-bold">{{ tech.currentArea }}</p>
                  </div>
                </div>
                <button class="p-1 text-sky-600 hover:bg-sky-50 rounded transition-all group-hover:scale-110">
                  <lucide-icon name="phone" [size]="14"></lucide-icon>
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-[#1e293b] text-[#f1f5f9] rounded-lg p-5 shadow-lg border border-slate-700 font-sans">
             <div class="flex items-center justify-between mb-4">
               <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400">ملخص الزيارات</span>
               <lucide-icon name="calendar" [size]="16" class="text-sky-400"></lucide-icon>
             </div>
             <div class="space-y-2">
               <div class="flex justify-between text-sm">
                 <span>بانتظار التحرك</span>
                 <span class="font-bold">04</span>
               </div>
               <div class="flex justify-between text-sm">
                 <span>قيد التنفيذ اليوم</span>
                 <span class="font-bold">12</span>
               </div>
               <div class="h-px bg-slate-700 my-3"></div>
               <div class="flex justify-between text-emerald-400 font-bold">
                 <span>مكتمل اليوم</span>
                 <span>08</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeVisitComponent {
  visits = signal([
    { time: '02:00 PM', patient: 'خالد عمر الشافعي', area: 'المعادي - شارع 9', technician: 'محمد محمود', status: 'قيد التنفيذ' },
    { time: '03:15 PM', patient: 'ريم عبدالله القاضي', area: 'التجمع الخامس - المنطقة الثالثة', technician: 'سيد علي', status: 'في الطريق' },
    { time: '04:30 PM', patient: 'منيرة أحمد فريد', area: 'مدينة نصر - عباس العقاد', technician: 'محمد محمود', status: 'في الطريق' },
    { time: '11:00 AM', patient: 'إبراهيم حسن كمال', area: 'مصر الجديدة', technician: 'أحمد يوسف', status: 'مكتمل' },
  ]);

  techGroup = signal([
    { name: 'محمد محمود', currentArea: 'المعادي (نشط)' },
    { name: 'سيد علي', currentArea: 'التجمع (نشط)' },
    { name: 'أحمد يوسف', currentArea: 'متاح', status: 'Idle' },
  ]);
}

