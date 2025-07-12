// Chart.js 인스턴스를 저장할 변수
let radarChart, chopinDonutChart, lisztDonutChart;

// 테마별 색상 팔레트 정의
const themes = {
    dark: {
        bodyBg: '#0A2463',
        bodyText: '#EFEFEF',
        cardBg: 'rgba(255, 255, 255, 0.05)',
        cardBorder: 'rgba(255, 255, 255, 0.2)',
        headingColor: '#EFEFEF',
        accentYellow: '#F4C150',
        accentRed: '#D8315B',
        accentBlue: '#3E92CC',
        gray300: '#E0E0E0',
        gray400: '#B0B0B0',
        flowItemBg: 'rgba(255, 255, 255, 0.1)',
        footerBorder: '#4A5568',
        chartGridLine: 'rgba(255, 255, 255, 0.2)',
        chartTickLabel: '#EFEFEF',
        chartPointLabel: '#EFEFEF',
        chopinChartBg: ['#3E92CC', '#1B477D'],
        lisztChartBg: ['#D8315B', '#8C1C3A', '#4D1020'],
        chopinRadarBorder: 'rgba(62, 146, 204, 1)',
        chopinRadarBg: 'rgba(62, 146, 204, 0.4)',
        lisztRadarBorder: 'rgba(216, 49, 91, 1)',
        lisztRadarBg: 'rgba(216, 49, 91, 0.4)',
        songLinkColor: '#F4C150', // Yellow for links in dark theme
    },
    light: {
        bodyBg: '#F9F5FF',
        bodyText: '#581C87',
        cardBg: '#FFFFFF',
        cardBorder: '#E0DAFF',
        headingColor: '#581C87',
        accentYellow: '#FFC107', /* Amber */
        accentRed: '#D8315B', /* Red Accent */
        accentBlue: '#9A67EA', /* Medium Purple */
        gray300: '#777777',
        gray400: '#999999',
        flowItemBg: 'rgba(0,0,0,0.05)',
        footerBorder: '#E0DAFF',
        chartGridLine: 'rgba(0, 0, 0, 0.1)',
        chartTickLabel: '#581C87',
        chartPointLabel: '#581C87',
        chopinChartBg: ['#9A67EA', '#6C3EA3'],
        lisztChartBg: ['#D8315B', '#A32448', '#6E182F'],
        chopinRadarBorder: 'rgba(154, 103, 234, 1)',
        chopinRadarBg: 'rgba(154, 103, 234, 0.4)',
        lisztRadarBorder: 'rgba(216, 49, 91, 1)',
        lisztRadarBg: 'rgba(216, 49, 91, 0.4)',
        songLinkColor: '#581C87', // Dark Purple for links in light theme
    },
    retro: {
        bodyBg: '#4A3B45',
        bodyText: '#F2D7EE',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        cardBorder: 'rgba(255, 255, 255, 0.3)',
        headingColor: '#F2D7EE',
        accentYellow: '#E07A5F', /* Muted Red/Orange */
        accentRed: '#E07A5F',
        accentBlue: '#A8C686', /* Muted Green */
        gray300: '#D7C6D2',
        gray400: '#B3A4AD',
        flowItemBg: 'rgba(0,0,0,0.2)',
        footerBorder: 'rgba(255,255,255,0.2)',
        chartGridLine: 'rgba(255, 255, 255, 0.15)',
        chartTickLabel: '#F2D7EE',
        chartPointLabel: '#F2D7EE',
        chopinChartBg: ['#A8C686', '#7C9B60'],
        lisztChartBg: ['#E07A5F', '#B35E4A', '#874435'],
        chopinRadarBorder: 'rgba(168, 198, 134, 1)',
        chopinRadarBg: 'rgba(168, 198, 134, 0.4)',
        lisztRadarBorder: 'rgba(224, 122, 95, 1)',
        lisztRadarBg: 'rgba(224, 122, 95, 0.4)',
        songLinkColor: '#A8C686', // Muted Green for links in retro theme
    }
};

// 차트 생성 함수
function createCharts(currentTheme) {
    // Chart.js 공통 설정 (툴팁 및 범례 스타일)
    const chartJsConfig = {
        plugins: {
            legend: {
                labels: {
                    color: currentTheme.chartTickLabel, // 범례 텍스트 색상
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    title: function(tooltipItems) {
                        const item = tooltipItems[0];
                        let label = item.chart.data.labels[item.dataIndex];
                        if (Array.isArray(label)) {
                            return label.join(' ');
                        } else {
                            return label;
                        }
                    }
                }
            }
        }
    };

    // 기존 차트 파괴 (메모리 누수 방지 및 새 테마 적용)
    if (radarChart) radarChart.destroy();
    if (chopinDonutChart) chopinDonutChart.destroy();
    if (lisztDonutChart) lisztDonutChart.destroy();
    
    // Radar Chart
    const radarCtx = document.getElementById('styleRadarChart').getContext('2d');
    radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['기교 (Virtuosity)', '감성 (Emotion)', '규모 (Scale)', '섬세함 (Delicacy)', '대중성 (Showmanship)'],
            datasets: [{
                label: '쇼팽 (Chopin)',
                data: [7, 9, 4, 10, 6],
                backgroundColor: currentTheme.chopinRadarBg,
                borderColor: currentTheme.chopinRadarBorder,
                pointBackgroundColor: currentTheme.chopinRadarBorder,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: currentTheme.chopinRadarBorder
            }, {
                label: '리스트 (Liszt)',
                data: [10, 7, 9, 5, 10],
                backgroundColor: currentTheme.lisztRadarBg,
                borderColor: currentTheme.lisztRadarBorder,
                pointBackgroundColor: currentTheme.lisztRadarBorder,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: currentTheme.lisztRadarBorder
            }]
        },
        options: {
            ...chartJsConfig,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: currentTheme.chartGridLine },
                    grid: { color: currentTheme.chartGridLine },
                    pointLabels: {
                        color: currentTheme.chartPointLabel,
                        font: { size: 12 }
                    },
                    ticks: {
                        color: currentTheme.chartTickLabel,
                        backdropColor: 'rgba(0, 0, 0, 0.5)',
                        stepSize: 2
                    }
                }
            }
        }
    });

    // Chopin Donut Chart
    const chopinDonutCtx = document.getElementById('chopinDonutChart').getContext('2d');
    chopinDonutChart = new Chart(chopinDonutCtx, {
        type: 'doughnut',
        data: {
            labels: ['피아노 독주곡', '기타'],
            datasets: [{
                data: [95, 5],
                backgroundColor: currentTheme.chopinChartBg,
                borderColor: currentTheme.bodyBg, /* Use bodyBg for border for consistency */
                borderWidth: 2,
            }]
        },
        options: { ...chartJsConfig, maintainAspectRatio: false }
    });

    // Liszt Donut Chart
    const lisztDonutCtx = document.getElementById('lisztDonutChart').getContext('2d');
    lisztDonutChart = new Chart(lisztDonutCtx, {
        type: 'doughnut',
        data: {
            labels: ['피아노 독주곡', '교향시/관현악곡', '기타'],
            datasets: [{
                data: [50, 35, 15],
                backgroundColor: currentTheme.lisztChartBg,
                borderColor: currentTheme.bodyBg, /* Use bodyBg for border for consistency */
                borderWidth: 2,
            }]
        },
        options: { ...chartJsConfig, maintainAspectRatio: false }
    });
}

// 테마 적용 함수
function applyTheme(themeName) {
    const body = document.body;
    const currentTheme = themes[themeName];

    // 모든 테마 클래스 제거 후 새 테마 클래스 추가
    Object.keys(themes).forEach(key => {
        body.classList.remove(`theme-${key}`);
    });
    body.classList.add(`theme-${themeName}`);

    // 텍스트 색상 업데이트 (Tailwind 클래스 직접 변경)
    document.querySelectorAll('.text-gray-300').forEach(el => {
        el.style.color = currentTheme.gray300;
    });
    document.querySelectorAll('.text-gray-400').forEach(el => {
        el.style.color = currentTheme.gray400;
    });
    // 특수문자 '/'를 포함하는 Tailwind 클래스 선택자 수정
    document.querySelectorAll('.bg-gray-800\\/50').forEach(el => { /* 수정된 부분 */
        el.style.backgroundColor = currentTheme.flowItemBg;
    });
    document.querySelectorAll('footer').forEach(el => {
        el.style.borderColor = currentTheme.footerBorder;
    });
    document.querySelectorAll('.card').forEach(el => {
        el.style.backgroundColor = currentTheme.cardBg;
        el.style.borderColor = currentTheme.cardBorder;
    });
    document.querySelectorAll('h1, h2, h3').forEach(el => {
        // h1, h2, h3는 기본적으로 .theme-dark에서 #EFEFEF로 설정되어 있으므로,
        // 다른 테마에서만 변경
        if (themeName !== 'dark') {
            el.style.color = currentTheme.headingColor;
        }
    });
    document.querySelectorAll('.big-stat, .text-accent-yellow').forEach(el => {
        el.style.color = currentTheme.accentYellow;
    });
    document.querySelectorAll('.text-accent-red').forEach(el => {
        el.style.color = currentTheme.accentRed;
    });
    document.querySelectorAll('.text-accent-blue').forEach(el => {
        el.style.color = currentTheme.accentBlue;
    });
    // flow-item::before는 CSS 의사 요소를 JS에서 직접 스타일링하기 어려움
    // 대신, CSS에서 테마 클래스에 따라 색상이 변경되도록 설정하는 것이 좋음
    // 예: .theme-dark .flow-item::before { color: #F4C150; }

    document.querySelectorAll('.tag-blue').forEach(el => {
        el.style.backgroundColor = currentTheme.tagBlue;
    });
    document.querySelectorAll('.tag-yellow').forEach(el => {
        el.style.backgroundColor = currentTheme.tagYellow;
    });
    document.querySelectorAll('.tag-red').forEach(el => {
        el.style.backgroundColor = currentTheme.tagRed;
    });
    document.querySelectorAll('.song-link').forEach(el => {
        el.style.color = currentTheme.songLinkColor;
    });


    // 차트 재생성
    createCharts(currentTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    // 초기 테마 설정 (기본값: dark)
    applyTheme('dark');

    // 테마 버튼 이벤트 리스너
    document.getElementById('theme-dark-btn').addEventListener('click', () => applyTheme('dark'));
    document.getElementById('theme-light-btn').addEventListener('click', () => applyTheme('light'));
    document.getElementById('theme-retro-btn').addEventListener('click', () => applyTheme('retro'));
});