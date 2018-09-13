import share from '@/api/share';

export function sensebotAuth() {
    return share({
        url: '/api/auth',
        method: 'get',
    });
}

export function sensebotData() {
    return share({
        url: '/api/auth',
        method: 'get',
    });
}
